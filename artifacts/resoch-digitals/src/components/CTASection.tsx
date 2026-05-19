import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const words = ["Re.Soch", "Deconstruct.", "Rebuild.", "Rule."];

  return (
    <section className="py-20 md:py-40 bg-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.08, 0.22, 0.08], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-5 md:px-8 text-center relative z-10">
        {/* Word stack */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-6 md:mb-8 flex flex-wrap justify-center gap-x-4 gap-y-1 md:gap-x-6">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 1.15 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.55 }}
              className="hover:text-primary transition-colors cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.45 }}
          className="text-base md:text-xl text-white/55 mb-8 md:mb-12 max-w-sm mx-auto"
        >
          Ready to Resoch your digital presence?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          <a
            href="#contact"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            }}
            className="inline-flex items-center gap-3 bg-primary text-black px-7 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-xl hover:bg-white transition-colors duration-300 group touch-manipulation active:scale-95"
            data-testid="button-cta-match"
          >
            Swipe Right to Match
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
