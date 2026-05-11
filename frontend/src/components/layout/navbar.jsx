import React from "react";
import { ShoppingBag, Menu, Search, User } from "lucide-react";
import "./Navbar.css"; // We will create this next

const Navbar = () => {
  return (
    <header className="navbar glass-panel">
      <div className="container nav-container">
        {/* Mobile Menu Icon */}
        <button className="icon-btn mobile-only" aria-label="Open Menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Brand Logo */}
        <div className="brand">
          <h1 className="serif-font">Aura.</h1>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="desktop-nav">
          <a href="/new" className="nav-link">
            New Arrivals
          </a>
          <a href="/heels" className="nav-link">
            Heels
          </a>
          <a href="/bridal" className="nav-link">
            Bridal
          </a>
          <a href="/sale" className="nav-link">
            Sale
          </a>
        </nav>

        {/* Action Icons */}
        <div className="nav-actions">
          <button className="icon-btn hidden-mobile" aria-label="Search">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button className="icon-btn hidden-mobile" aria-label="Account">
            <User size={22} strokeWidth={1.5} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
