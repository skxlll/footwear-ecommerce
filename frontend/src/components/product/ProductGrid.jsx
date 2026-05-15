import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "../ui/ProductSkeleton";
import ScrollReveal from "../ui/ScrollReveal";
import { fetchProducts } from "../../lib/api";
import { staggerContainer, easeLuxury } from "../../lib/motion";

const filters = ["All", "Bridal", "Heels", "Office Wear", "Party Wear"];

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="collection" className="section-pad pt-8">
      <div className="container-luxury">
        <ScrollReveal className="mb-10 text-center sm:mb-14">
          <span className="label-caps">The Collection</span>
          <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl lg:text-5xl">
            Curated for every moment
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-stone sm:text-base">
            Discover silhouettes crafted for celebration, work, and everything
            between.
          </p>

          <div className="mt-8 hidden flex-wrap justify-center gap-2 lg:flex">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-charcoal text-cream shadow-[var(--shadow-soft)]"
                    : "bg-white/50 text-stone hover:bg-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-600/80">{error}</p>
        )}

        {!loading && !error && (
          <motion.div
            key={activeFilter}
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="py-16 text-center text-stone">No styles in this category yet.</p>
        )}
      </div>

      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="glass flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-charcoal shadow-[var(--shadow-lift)]"
        >
          <SlidersHorizontal size={18} />
          Filter & Sort
        </button>
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm lg:hidden"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: easeLuxury }}
              className="fixed right-0 bottom-0 left-0 z-50 rounded-t-[2rem] glass-strong p-6 pb-10 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl">Filter</h3>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/60"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f);
                      setSheetOpen(false);
                    }}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                      activeFilter === f
                        ? "bg-charcoal text-cream"
                        : "bg-white/60 text-stone"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;
