import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import "./ProductGrid.css";

// The animation properties for an individual card
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // A custom premium "ease-out" curve
    },
  },
};

const ProductCard = ({ product }) => {
  return (
    <motion.div variants={itemVariants} className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} loading="lazy" />

        {/* Badges */}
        {product.isNew ? <span className="badge new-badge">New</span> : null}

        {/* Quick Add Button - Now hidden by default via CSS */}
        <button className="quick-add-btn glass-panel" aria-label="Quick Add">
          <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name serif-font">{product.name}</h3>
        <p className="product-price">Rs. {product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
