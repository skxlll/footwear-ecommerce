const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export { API_BASE };
