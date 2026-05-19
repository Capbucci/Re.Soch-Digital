import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wraps any section in a gentle fade-in + slide-up reveal
 * as it enters the viewport. Works safely alongside sections
 * that have their own internal whileInView animations.
 */
export default function RevealSection({
  children,
  delay = 0,
  className = "",
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
