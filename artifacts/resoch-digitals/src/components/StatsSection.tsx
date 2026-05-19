import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { label: "Brands Re.Soch'd", value: 500, suffix: "+" },
  { label: "Avg ROI", value: 10, suffix: "x" },
  { label: "Industries", value: 50, suffix: "+" },
  { label: "Campaigns", value: 200, suffix: "+" },
];

function CountUp({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) count.set(to);
  }, [inView, to, count]);

  return (
    <span className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="bg-black py-8 md:py-10 border-t border-b border-white/5">
      <div className="container mx-auto px-5 md:px-8 max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
              className="text-center group"
            >
              {/* Number */}
              <div className="text-2xl md:text-3xl font-serif font-black text-primary leading-none mb-1">
                <CountUp to={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              {/* Label */}
              <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-widest leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
