import React from "react";
import { Plus } from "lucide-react";
import "./ProductGrid.css"; // We will create this combined CSS file next

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        {/* Placeholder premium shoe images from Unsplash */}
        <img src={product.image} alt={product.name} loading="lazy" />

        {/* Badges for New Arrival / Sale */}
        {product.isNew && <span className="badge new-badge">New</span>}
        {product.isSale && <span className="badge sale-badge">Sale</span>}

        {/* Quick Add Button (Mobile Friendly Touch Target) */}
        <button className="quick-add-btn glass-panel" aria-label="Quick Add">
          <Plus size={20} />
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name serif-font">{product.name}</h3>
        <p className="product-price">Rs. {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
