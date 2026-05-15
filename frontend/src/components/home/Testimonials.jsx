import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { easeLuxury } from "../../lib/motion";

const testimonials = [
  {
    quote:
      "The bridal heels were impossibly comfortable — I danced all night and still felt elegant.",
    name: "Amara K.",
    role: "Bride, Colombo",
  },
  {
    quote:
      "Aura feels like a boutique in my pocket. The packaging, the fit, the softness — everything.",
    name: "Dilani S.",
    role: "Verified buyer",
  },
  {
    quote:
      "Finally shoes that look editorial but work for real life. My office heels are perfection.",
    name: "Nethmi R.",
    role: "Style editor",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-pad">
      <div className="container-luxury">
        <ScrollReveal className="text-center">
          <span className="label-caps">Voices</span>
          <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl">
            Loved by women who know
          </h2>
        </ScrollReveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="glass rounded-[2rem] px-8 py-12 sm:px-14 sm:py-16">
            <div className="mb-6 flex justify-center gap-1 text-accent-deep">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: easeLuxury }}
                className="text-center"
              >
                <p className="font-display text-xl leading-relaxed italic text-charcoal sm:text-2xl lg:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <cite className="not-italic">
                    <span className="block text-sm font-medium text-charcoal">
                      {current.name}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {current.role}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/50 text-charcoal transition-all hover:bg-white/80"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-accent-deep" : "w-1.5 bg-charcoal/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/50 text-charcoal transition-all hover:bg-white/80"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
