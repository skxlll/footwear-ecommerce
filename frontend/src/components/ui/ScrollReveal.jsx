import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "../../lib/motion";

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  once = true,
  amount = 0.2,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: {
            ...fadeUp.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
