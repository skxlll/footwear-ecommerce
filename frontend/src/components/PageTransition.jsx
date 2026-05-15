import { motion } from "framer-motion";
import { pageTransition } from "../lib/motion";

const PageTransition = ({ children }) => (
  <motion.div {...pageTransition}>{children}</motion.div>
);

export default PageTransition;
