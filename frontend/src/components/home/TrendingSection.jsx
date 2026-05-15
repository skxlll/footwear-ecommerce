import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "../ui/ScrollReveal";
import ProductCard from "../product/ProductCard";
import ProductSkeleton from "../ui/ProductSkeleton";
import { fetchProducts } from "../../lib/api";
import { staggerContainer } from "../../lib/motion";

const TrendingSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="trending" className="section-pad bg-white/20">
      <div className="container-luxury">
        <ScrollReveal className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span className="label-caps">Trending Now</span>
          <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl lg:text-5xl">
            Most loved this week
          </h2>
          <p className="mt-4 max-w-lg text-sm text-stone sm:text-base">
            Styles our community can&apos;t stop wearing — refreshed daily.
          </p>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}

        <ScrollReveal className="mt-12 text-center" delay={0.2}>
          <Link to="/#collection" className="btn-ghost">
            View all styles
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrendingSection;
