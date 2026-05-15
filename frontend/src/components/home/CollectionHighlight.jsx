import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { easeLuxury } from "../../lib/motion";

const CollectionHighlight = ({
  id,
  label,
  title,
  subtitle,
  image,
  imageAlt,
  reverse = false,
  accent = "from-rose/40 to-peach/30",
}) => (
  <section id={id} className="section-pad">
    <div className="container-luxury">
      <ScrollReveal>
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
            <div
              className={`absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br ${accent} opacity-60 blur-2xl`}
            />
            <motion.div
              className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: easeLuxury }}
            >
              <img
                src={image}
                alt={imageAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className={reverse ? "lg:order-1" : ""}>
            <span className="label-caps">{label}</span>
            <h2 className="font-display mt-4 text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-stone sm:text-base">
              {subtitle}
            </p>
            <motion.a
              href="#collection"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/50 px-6 py-3 text-sm font-medium text-charcoal backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-[var(--shadow-soft)]"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop the edit
              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default CollectionHighlight;
