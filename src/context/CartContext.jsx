import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "ma-elegance-cart";

function readStorage(key) { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } }

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEY));
  const [wishlist, setWishlist] = useState(() => readStorage("ma-elegance-wishlist"));
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("ma-elegance-wishlist", JSON.stringify(wishlist)), [wishlist]);
  const addToCart = (product, quantity = 1) => setCart(items => {
    const existing = items.find(item => item.id === product.id);
    if (existing) return items.map(item => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item);
    return [...items, { ...product, quantity: Math.min(quantity, product.stock) }];
  });
  const updateQuantity = (id, quantity) => setCart(items => items.map(item => item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item));
  const removeFromCart = id => setCart(items => items.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const toggleWishlist = product => setWishlist(items => items.some(item => item.id === product.id) ? items.filter(item => item.id !== product.id) : [...items, product]);
  const isWishlisted = id => wishlist.some(item => item.id === id);
  const value = useMemo(() => ({ cart, wishlist, addToCart, updateQuantity, removeFromCart, clearCart, toggleWishlist, isWishlisted, cartCount: cart.reduce((s,i)=>s+i.quantity,0), subtotal: cart.reduce((s,i)=>s+i.price*i.quantity,0) }), [cart, wishlist]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
