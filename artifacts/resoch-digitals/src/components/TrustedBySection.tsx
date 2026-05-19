import { motion } from "framer-motion";

const brands = [
  "MYSA",
  "NAMISHREE",
  "MOWZZ",
  "POOJA ARCHITECTS",
  "SUYU",
  "CASSELORE",
];

/* Repeat enough times for a seamless infinite loop */
const loopBrands = [...brands, ...brands, ...brands, ...brands];

/* ─── CSS Pac-Man with real chomping jaws ─── */
function PacMan({ size = 64 }: { size?: number }) {
  const half = size / 2;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* Yellow glow behind */}
      <motion.div
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,136,88,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top jaw — rotates down when chomping (opens mouth) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: half,
          background: "#FF8858",
          borderRadius: `${half}px ${half}px 0 0`,
          transformOrigin: "50% 100%",
        }}
        animate={{ rotate: ["-28deg", "0deg", "-28deg"] }}
        transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom jaw — rotates up when chomping */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: half,
          background: "#FF8858",
          borderRadius: `0 0 ${half}px ${half}px`,
          transformOrigin: "50% 0%",
        }}
        animate={{ rotate: ["28deg", "0deg", "28deg"] }}
        transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Eye */}
      <div
        style={{
          position: "absolute",
          top: size * 0.18,
          right: size * 0.22,
          width: size * 0.1,
          height: size * 0.1,
          borderRadius: "50%",
          background: "#000",
          zIndex: 5,
        }}
      />
    </div>
  );
}

export default function TrustedBySection() {
  /* Width of one brand "item" in px — used to calculate the total scroll distance.
     We rely on CSS animation so it doesn't matter if it's not pixel-perfect; 
     the seamless loop is handled by repeating the list 4×. */
  const ITEM_WIDTH_APPROX = 220; // px per brand slot (text + gap)
  const totalWidth = brands.length * ITEM_WIDTH_APPROX;

  return (
    <section className="bg-black py-16 md:py-24 overflow-hidden border-t border-white/5">
      {/* Heading */}
      <div className="container mx-auto px-5 md:px-8 max-w-5xl mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Trusted By</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
            Brands That <span className="text-primary">Re.Soch'd</span> with Us
          </h2>
        </motion.div>
      </div>

      {/* ── Pac-Man eating track ── */}
      <div className="relative w-full" style={{ height: 88, overflow: "hidden" }}>

        {/* Scrolling brand names — move right → left endlessly */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 flex items-center"
          style={{ width: "max-content" }}
          animate={{ x: [0, -totalWidth] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {loopBrands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center flex-shrink-0"
              style={{ width: ITEM_WIDTH_APPROX, paddingRight: 32 }}
            >
              {/* Pellet dot */}
              <motion.span
                className="inline-block rounded-full bg-primary flex-shrink-0 mr-3"
                style={{ width: 10, height: 10 }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 0.32, repeat: Infinity, delay: (i % brands.length) * 0.08 }}
              />
              <span
                className="text-white/60 font-black text-sm md:text-lg tracking-widest uppercase font-mono whitespace-nowrap"
              >
                {brand}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Pac-Man — sits at the left, eating ── */}
        <div
          className="absolute left-3 md:left-8 top-1/2 z-30 flex items-center"
          style={{ transform: "translateY(-50%)" }}
        >
          <PacMan size={56} />
        </div>

        {/* Black mask to the LEFT of Pac-Man — hides "eaten" brands */}
        {/* This is the key: anything left of Pac-Man is hidden under black */}
        <div
          className="absolute inset-y-0 left-0 bg-black z-20 pointer-events-none"
          style={{ width: 72 }}
        />

        {/* Subtle right fade */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

    </section>
  );
}
