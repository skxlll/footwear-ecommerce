import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";
import { easeLuxury } from "../../lib/motion";

const EditorialBanner = () => (
  <section className="section-pad">
    <div className="container-luxury">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <div className="grid min-h-[420px] lg:grid-cols-2 lg:min-h-[520px]">
            <div className="relative order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1 lg:p-16">
              <span className="label-caps">Editorial</span>
              <h2 className="font-display mt-4 text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl">
                The art of
                <span className="block italic text-accent-deep">the perfect heel</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-stone sm:text-base">
                Each pair is sculpted for balance and grace — where craftsmanship
                meets contemporary femininity.
              </p>
              <motion.a
                href="#collection"
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
                whileHover={{ x: 4 }}
                transition={{ ease: easeLuxury }}
              >
                Read the story
              </motion.a>
            </div>
            <div className="relative order-1 min-h-[280px] lg:order-2 lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900&q=85"
                alt="Editorial footwear"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blush/30 to-transparent lg:from-blush/60" />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default EditorialBanner;
