import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { staggerItem } from "../../lib/motion";

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const hoverImage =
    product.imageHover ||
    product.image?.replace("w=400", "w=600") ||
    product.image;

  return (
    <motion.article variants={staggerItem} className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-3xl bg-cream/80 shadow-[var(--shadow-soft)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[var(--ease-luxury)] group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-[var(--ease-luxury)] group-hover:scale-110 group-hover:opacity-100"
            style={{ objectPosition: "center 30%" }}
          />

          {product.isNew ? (
            <span className="absolute top-3 left-3 rounded-full glass px-3 py-1 text-[0.65rem] font-semibold tracking-wider text-charcoal uppercase">
              New
            </span>
          ) : null}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setWishlisted((w) => !w);
            }}
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-charcoal opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              className={wishlisted ? "fill-accent-deep text-accent-deep" : ""}
            />
          </button>

          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="absolute right-3 bottom-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-charcoal text-white opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
            aria-label="Quick add"
          >
            <Plus size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-1 px-0.5">
          <p className="text-[0.7rem] font-medium tracking-[0.12em] text-muted uppercase">
            {product.category}
          </p>
          <h3 className="font-display text-base leading-snug text-charcoal sm:text-lg">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-stone">
            Rs. {Number(product.price).toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
