import React, { useContext } from "react";
import {
  ShoppingBag,
  Menu,
  Search,
  User,
  Settings,
  LogOut,
} from "lucide-react"; // Added Settings & LogOut
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Pull user state

  return (
    <motion.header
      className="navbar glass-panel"
      initial={{
        y: -100,
        opacity: 0,
      }} /* Start above the screen and invisible */
      animate={{ y: 0, opacity: 1 }} /* Slide down to normal position */
      transition={{
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      }} /* Premium easing curve */
    >
      <div className="container nav-container">
        {/* Mobile Menu Icon */}
        <button className="icon-btn mobile-only" aria-label="Open Menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>

        {/* Brand Logo */}
        <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 className="serif-font">Aura.</h1>
          </Link>
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

          {/* Dynamic User Greeting */}
          {user ? (
            <div
              className="user-greeting hidden-mobile"
              style={{ fontSize: "0.85rem", color: "var(--text-light)" }}
            >
              Hi, {user.name.split(" ")[0]}
            </div>
          ) : null}

          {/* User / Login Trigger */}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="icon-btn" aria-label="Account">
              <User size={22} strokeWidth={1.5} />
            </button>
          </Link>

          {/* Cart Icon */}
          <button className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="cart-badge">0</span>
          </button>

          {/* DYNAMIC ADMIN ICON - Renders only if user is logged in AND is an admin */}
          {user && user.role === "admin" && (
            <button
              className="icon-btn admin-btn"
              aria-label="Admin Panel"
              style={{ color: "var(--accent-action)" }}
            >
              <Settings size={22} strokeWidth={1.5} />
            </button>
          )}

          {/* Temporary Logout Button for Testing */}
          {user && (
            <button className="icon-btn" aria-label="Logout" onClick={logout}>
              <LogOut size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
