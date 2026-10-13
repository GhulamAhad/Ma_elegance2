import { createContext, useContext, useEffect, useMemo, useState } from "react";
import defaultProducts from "../data/products";
import { api } from "../services/Services";

const CatalogContext = createContext(null);
const ADMIN_KEY = "ma-elegance-admin-session";

function read(key, fallback) { try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; } }

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(defaultProducts);
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState(() => read(ADMIN_KEY, null));
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");


  const loadCatalog = async () => {
    try {
      const data = await api.products();

      // Support common API response formats.
      let catalog = null;

      if (Array.isArray(data)) {
        catalog = data;
      } else if (Array.isArray(data?.products)) {
        catalog = data.products;
      } else if (Array.isArray(data?.items)) {
        catalog = data.items;
      } else if (Array.isArray(data?.data)) {
        catalog = data.data;
      }

      if (!catalog) {
        console.error("Unexpected products API response:", data);
        setApiError("The server returned an unexpected products format.");
        return;
      }

      setProducts(catalog);
      setApiError("");
    } catch (error) {
      console.error("Failed to load catalog:", error);
      setApiError(error.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCatalog(); }, []);
  useEffect(() => { if (admin) { localStorage.setItem(ADMIN_KEY, JSON.stringify(admin)); api.orders().then(setOrders).catch(() => { }); } else localStorage.removeItem(ADMIN_KEY); }, [admin]);

  const addProduct = async product => { const created = await api.createProduct(product); setProducts(items => [created, ...items]); return created; };
  const updateProduct = async (id, changes) => { const updated = await api.updateProduct(id, changes); setProducts(items => items.map(p => p.id === id ? updated : p)); return updated; };
  const deleteProduct = async id => { await api.deleteProduct(id); setProducts(items => items.filter(p => p.id !== id)); };
  const addOrder = async order => { const result = await api.createOrder({ customer: order.customer, items: order.items.map(i => ({ productId: i.id, quantity: i.quantity })), notes: order.customer?.notes || "", paymentMethod: "COD" }); await loadCatalog(); if (admin) setOrders(await api.orders()); return result; };
  const updateOrderStatus = async (id, status) => { await api.updateOrderStatus(id, status); setOrders(items => items.map(o => o.id === id ? { ...o, status } : o)); await loadCatalog(); };
  const loginAdmin = async (email, password) => { const result = await api.login(email, password); setAdmin(result.admin); sessionStorage.setItem("ma-elegance-admin-token", result.access_token); setOrders(await api.orders()); return true; };
  const logoutAdmin = () => { sessionStorage.removeItem("ma-elegance-admin-token"); setAdmin(null); setOrders([]); };

  const value = useMemo(() => ({ products, orders, admin, loading, apiError, addProduct, updateProduct, deleteProduct, addOrder, updateOrderStatus, loginAdmin, logoutAdmin, isAdmin: Boolean(admin), refresh: loadCatalog }), [products, orders, admin, loading, apiError]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
export const useCatalog = () => useContext(CatalogContext);
