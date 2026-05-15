import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeLuxury } from "../../lib/motion";

const Hero = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, -80]);
  const imageScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const textY = useTransform(scrollY, [0, 350], [0, 60]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-[4.25rem] sm:pt-[4.75rem]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-blush/40 to-transparent" />
        <div className="absolute top-[15%] right-[-10%] h-[70vmin] w-[70vmin] rounded-full bg-peach/30 blur-3xl" />
        <div className="absolute bottom-[10%] left-[-15%] h-[50vmin] w-[50vmin] rounded-full bg-rose/25 blur-3xl" />
      </div>

      <div className="container-luxury relative flex min-h-[calc(100svh-4.25rem)] flex-col items-center justify-center gap-10 pb-16 lg:flex-row lg:items-center lg:gap-6 lg:pb-24">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="z-10 max-w-xl text-center lg:max-w-lg lg:flex-1 lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLuxury }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: easeLuxury }}
            className="label-caps inline-block"
          >
            Spring / Summer 2026
          </motion.span>

          <h1 className="heading-editorial mt-5 text-balance text-charcoal">
            Walk in
            <br />
            <span className="italic text-accent-deep">quiet luxury</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone sm:text-lg lg:mx-0">
            Hand-finished silhouettes, soft palettes, and the kind of comfort
            that feels invisible — designed for the modern woman.
          </p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: easeLuxury }}
          >
            <motion.a
              href="#collection"
              className="btn-primary group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Collection
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
            <Link to="/register" className="btn-ghost">
              Join Aura
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative flex w-full flex-1 items-center justify-center lg:min-h-[70vh]">
          <div className="absolute h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-gradient-to-br from-peach/50 to-rose/30 blur-2xl" />
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative gpu"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: easeLuxury }}
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)] sm:rounded-[2.5rem]">
              <img
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=90"
                alt="Luxury stiletto heel"
                className="h-[min(65vh,520px)] w-[min(88vw,440px)] object-cover"
                fetchPriority="high"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>
            <motion.div
              className="glass absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-6 py-2.5 text-xs font-medium tracking-widest text-stone uppercase sm:-bottom-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, ease: easeLuxury }}
            >
              New Season Edit
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[0.65rem] tracking-[0.25em] uppercase">Scroll</span>
        <motion.span
          className="block h-10 w-px bg-charcoal/20"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
