import { useRef } from "react";

interface MarqueeBannerProps {
  phrases?: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

const DEFAULT_PHRASES = [
  "RETHINK",
  "·",
  "RE.SOCH",
  "·",
  "REIMAGINE",
  "·",
  "REINVENT",
  "·",
];

export default function MarqueeBanner({
  phrases = DEFAULT_PHRASES,
  direction = "left",
  speed = 28,
  className = "",
}: MarqueeBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Repeat enough times so text fills any screen width */
  const repeated = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div
      className={`w-full overflow-hidden border-t border-b border-white/8 py-4 md:py-5 bg-black relative select-none ${className}`}
    >
      {/* Subtle left / right edge fade */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex whitespace-nowrap w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {/* Two identical sets — seamless loop */}
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center gap-6 md:gap-8 pr-6 md:pr-8">
            {repeated.map((phrase, i) => (
              <span
                key={`${copy}-${i}`}
                className={
                  phrase === "·"
                    ? "text-primary text-3xl md:text-4xl font-black leading-none"
                    : "text-white/20 text-2xl md:text-3xl font-serif font-black tracking-tight leading-none hover:text-white/60 transition-colors duration-300"
                }
              >
                {phrase}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
