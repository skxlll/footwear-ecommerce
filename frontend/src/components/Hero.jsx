import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  // 1. Hook into the browser's scroll position
  const { scrollY } = useScroll();

  // 2. Map scroll position to visual effects (Apple-style scroll-jacking)
  // As you scroll from 0px to 500px down, the image rotates from 0 to -15 degrees
  const shoeRotate = useTransform(scrollY, [0, 500], [0, -15]);

  // As you scroll, the image scales up slightly for a parallax depth effect
  const shoeScale = useTransform(scrollY, [0, 500], [1, 1.15]);

  // The image moves up slightly slower than the page scrolls (Parallax)
  const shoeY = useTransform(scrollY, [0, 500], [0, -100]);

  // The text fades out quickly as you scroll down
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textY = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="hero-section">
      <div className="hero-container container">
        {/* Left Side: Typography that fades and drops on scroll */}
        <motion.div
          className="hero-text"
          style={{ opacity: textOpacity, y: textY }}
        >
          <span className="hero-label">The 2026 Collection</span>
          <h1 className="serif-font hero-title">
            Step into <br />
            <span className="italic-accent">Elegance.</span>
          </h1>
          <p className="hero-subtitle">
            Experience footwear engineered for modern luxury. Scroll to explore
            the new arrivals.
          </p>
        </motion.div>

        {/* Right Side: The Interactive "Apple-style" Shoe */}
        <div className="hero-visual">
          {/* Ambient glowing backdrop for the shoe */}
          <div className="glow-orb"></div>

          <motion.img
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=90"
            alt="Premium Stiletto"
            className="hero-shoe"
            style={{
              rotate: shoeRotate,
              scale: shoeScale,
              y: shoeY,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
