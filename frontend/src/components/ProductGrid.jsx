import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the Node backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Calling our local Express server
        const response = await fetch("http://localhost:5001/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="serif-font">The Collection</h2>
          <p className="subtitle">Discover our latest arrivals</p>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <Loader2
              className="animate-spin"
              size={32}
              color="var(--text-light)"
            />
          </div>
        )}

        {error && (
          <div
            style={{ textAlign: "center", color: "#d9534f", padding: "20px" }}
          >
            <p>Connection Error: Make sure your backend is running.</p>
          </div>
        )}

        {/* Live CSS Grid */}
        {!loading && !error && (
          <div className="grid-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile Sticky Filter Button */}
        <div className="mobile-filter-container">
          <button className="filter-btn glass-panel">
            <SlidersHorizontal size={18} />
            <span>Filter & Sort</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
