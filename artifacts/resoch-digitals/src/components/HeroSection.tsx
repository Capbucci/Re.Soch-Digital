import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DESKTOP_SRC = "/api/video/hero-desktop.mp4";
const MOBILE_SRC = "/api/video/hero-mobile.mp4";
const POSTER = "/images/hero-bg.jpg";

const HERO_STATS = [
  { value: 500, suffix: "+", label: "Brands Re.Soch'd" },
  { value: 10, suffix: "x", label: "Avg ROI" },
  { value: 200, suffix: "+", label: "Campaigns" },
];

function HeroVideo({
  src,
  className,
  testId,
  onPlaying,
}: {
  src: string;
  className: string;
  testId: string;
  onPlaying?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => onPlaying?.();
    video.addEventListener("playing", handlePlaying);

    const tryPlay = () => {
      video.play().catch(() => {
        /* On block, wait for user interaction */
        const resume = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", resume);
          document.removeEventListener("touchstart", resume);
        };
        document.addEventListener("click", resume, { once: true });
        document.addEventListener("touchstart", resume, { once: true });
      });
    };

    /* Attempt immediately, then again on canplay */
    tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [onPlaying]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      className={className}
      data-testid={testId}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: 2200, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    const t = setTimeout(() => count.set(to), 600);
    return () => clearTimeout(t);
  }, [to, count]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section id="hero" className="relative w-full bg-black" style={{ height: "100svh" }}>

      {/* ── Poster / fallback image (always visible until video plays) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${POSTER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: videoPlaying ? 0 : 1,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* ── Videos ── */}
      <HeroVideo
        src={DESKTOP_SRC}
        testId="video-hero-desktop"
        onPlaying={() => setVideoPlaying(true)}
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />
      <HeroVideo
        src={MOBILE_SRC}
        testId="video-hero-mobile"
        onPlaying={() => setVideoPlaying(true)}
        className="md:hidden absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Dark overlay so text is always readable ── */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[5]" />

      {/* ── Dark gradient at bottom so stats are readable ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {/* ── Grain / noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.045,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Floating ticker stats (bottom-left) ── */}
      <div className="absolute bottom-8 left-5 md:left-10 z-30 flex flex-col gap-2 md:flex-row md:gap-8">
        {HERO_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5, ease: "easeOut" }}
            className="flex items-baseline gap-1.5"
          >
            <span className="text-2xl md:text-3xl font-serif font-black text-primary tabular-nums leading-none">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-white/55 text-[10px] md:text-xs font-medium uppercase tracking-widest leading-tight">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
