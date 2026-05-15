import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { motion } from "framer-motion"; // <-- Import motion
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

// Define the staggered cascade rules
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // Delay each card by 0.15s
      delayChildren: 0.4, // Wait slightly before starting
    },
  },
};

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
        {/* Animate the Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="section-header"
        >
          <h2 className="serif-font">The Collection</h2>
          <p className="subtitle">Discover our latest arrivals</p>
        </motion.div>

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
          <div style={{ textAlign: "center", color: "#d9534f" }}>{error}</div>
        )}

        {/* Live CSS Grid with Staggered Animation */}
        {!loading && !error && (
          <motion.div
            className="grid-container"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        {/* Mobile Sticky Filter */}
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
