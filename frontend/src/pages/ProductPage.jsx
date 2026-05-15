import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  ShoppingBag,
  Heart,
  Loader2,
} from "lucide-react";
import { fetchProduct, fetchProducts } from "../lib/api";
import ProductCard from "../components/product/ProductCard";
import Footer from "../components/layout/Footer";
import { easeLuxury, staggerContainer } from "../lib/motion";

const SIZES = ["5", "6", "7", "8", "9", "10"];
const COLORS = [
  { name: "Blush", hex: "#e8d4d8" },
  { name: "Nude", hex: "#e8cfc0" },
  { name: "Noir", hex: "#2a2826" },
];

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(COLORS[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProduct(id)
      .then((data) => {
        setProduct(data);
        const imgs = data.images?.length ? data.images : [data.image];
        setImageIndex(0);
        return fetchProducts().then((all) => {
          setRelated(
            all.filter((p) => p.id !== data.id && p.category === data.category).slice(0, 4),
          );
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const images = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const handleAdd = () => {
    if (!size) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-24">
        <Loader2 className="animate-spin text-muted" size={36} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-luxury flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-24 text-center">
        <p className="text-stone">{error || "Product not found"}</p>
        <Link to="/" className="btn-ghost">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container-luxury pt-24 pb-32 lg:pb-16">
        <Link
          to="/#collection"
          className="mb-8 inline-flex items-center gap-1 text-sm text-stone transition-colors hover:text-charcoal"
        >
          <ChevronLeft size={16} />
          Back to collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easeLuxury }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-cream/60 shadow-[var(--shadow-soft)] sm:rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[imageIndex]}
                  src={images[imageIndex]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeLuxury }}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setImageIndex((i) => (i - 1 + images.length) % images.length)
                    }
                    className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                    className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    className={`h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      i === imageIndex
                        ? "border-accent-deep shadow-[var(--shadow-soft)]"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:sticky lg:top-28 lg:self-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeLuxury }}
          >
            <span className="label-caps">{product.category}</span>
            {product.isNew && (
              <span className="ml-3 rounded-full bg-rose/50 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase">
                New
              </span>
            )}
            <h1 className="font-display mt-3 text-3xl font-medium sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-medium text-charcoal">
              Rs. {Number(product.price).toLocaleString()}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
              {product.description ||
                "Crafted with premium materials for all-day comfort and timeless elegance. A signature Aura silhouette."}
            </p>

            <div className="mt-8">
              <p className="mb-3 text-xs font-medium tracking-wider text-muted uppercase">
                Color — {color.name}
              </p>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      color.name === c.name
                        ? "border-charcoal scale-110"
                        : "border-white/80"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs font-medium tracking-wider text-muted uppercase">
                Size (EU)
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-[3rem] rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      size === s
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-white/60 bg-white/40 text-charcoal hover:bg-white/70"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-white/60 bg-white/50">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-charcoal"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center text-charcoal"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/50 text-charcoal hover:bg-white/80"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>

            <motion.button
              type="button"
              onClick={handleAdd}
              disabled={!size}
              className="btn-primary mt-8 hidden w-full lg:flex"
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Added to bag ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    {size ? "Add to bag" : "Select a size"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <div className="mt-10 space-y-4 border-t border-white/40 pt-8">
              {[
                { icon: Truck, text: "Free delivery on orders over Rs. 15,000" },
                { icon: RotateCcw, text: "14-day easy returns" },
                { icon: Shield, text: "Authentic Aura craftsmanship" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-stone">
                  <Icon size={18} strokeWidth={1.5} className="text-accent-deep" />
                  {text}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDetailsOpen((o) => !o)}
              className="mt-8 flex w-full items-center justify-between border-t border-white/40 pt-6 text-sm font-medium text-charcoal"
            >
              Product details
              <ChevronRight
                size={18}
                className={`transition-transform ${detailsOpen ? "rotate-90" : ""}`}
              />
            </button>
            <AnimatePresence>
              {detailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden text-sm leading-relaxed text-stone"
                >
                  <p className="pt-4 pb-2">
                    Premium upper materials, cushioned insole, and a balanced heel
                    engineered for stability. Wipe clean with a soft cloth. Store in
                    the provided dust bag.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <h2 className="font-display mb-10 text-center text-2xl font-medium sm:text-3xl">
              You may also love
            </h2>
            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          </section>
        )}
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/50 glass-strong p-4 lg:hidden">
        <div className="flex gap-3">
          <div className="flex flex-1 items-center rounded-full border border-white/60 bg-white/50 px-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center"
            >
              <Minus size={16} />
            </button>
            <span className="flex-1 text-center text-sm font-medium">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!size}
            className="btn-primary flex-1"
          >
            {added ? "Added ✓" : size ? "Add to bag" : "Pick size"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
