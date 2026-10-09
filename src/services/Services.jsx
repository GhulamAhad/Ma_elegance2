const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const token = sessionStorage.getItem("ma-elegance-admin-token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Request failed");
  return data;
}

export const api = {
  products: () => request("/products"),
  createProduct: product => request("/products", { method: "POST", body: JSON.stringify(product) }),
  updateProduct: (id, product) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(product) }),
  deleteProduct: id => request(`/products/${id}`, { method: "DELETE" }),
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  orders: () => request("/orders"),
  createOrder: payload => request("/orders", { method: "POST", body: JSON.stringify(payload) }),
  updateOrderStatus: (reference, status) => request(`/orders/${reference}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  dashboard: () => request("/dashboard"),
  uploadImage: async file => {
    const token = sessionStorage.getItem("ma-elegance-admin-token");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_URL}/admin/upload-image`, { method: "POST", body: form, headers: token ? { Authorization: `Bearer ${token}` } : {} });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Image upload failed");
    return data;
  },
};
