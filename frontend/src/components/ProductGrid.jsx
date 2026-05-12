import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

// Dummy Data mimicking our MySQL structure
const dummyProducts = [
  {
    id: 1,
    name: "Aura Pearl Stiletto",
    price: "12,500",
    category: "Bridal",
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  },
  {
    id: 2,
    name: "Velvet Evening Pump",
    price: "8,900",
    category: "Heels",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&q=80",
  },
  {
    id: 3,
    name: "Classic Nude Block",
    price: "6,500",
    category: "Office Wear",
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&q=80",
  },
  {
    id: 4,
    name: "Satin Ankle Strap",
    price: "9,200",
    category: "Party Wear",
    isSale: true,
    image:
      "https://images.unsplash.com/photo-1515347619362-e6fd427ee980?w=500&q=80",
  },
];

const ProductGrid = () => {
  return (
    <section className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="serif-font">The Collection</h2>
          <p className="subtitle">Discover our latest arrivals</p>
        </div>

        {/* CSS Grid for Products */}
        <div className="grid-container">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

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
