import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  born: number;
}

const LIFESPAN = 600; // ms
const MAX_PARTICLES = 60;
const SPAWN_THROTTLE = 20; // ms between spawns

export default function MouseTrailParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const lastSpawn = useRef(0);
  const rafId = useRef<number | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile.current) return; // disable on touch devices

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_THROTTLE) return;
      lastSpawn.current = now;

      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        if (particles.current.length >= MAX_PARTICLES) break;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 1.0;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // slight upward drift
          alpha: 0.7 + Math.random() * 0.3,
          size: 2 + Math.random() * 3,
          born: performance.now(),
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      particles.current = particles.current.filter((p) => {
        const age = now - p.born;
        if (age >= LIFESPAN) return false;

        const t = age / LIFESPAN;
        const alpha = p.alpha * (1 - t);
        const size = p.size * (1 - t * 0.4);

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015; // tiny gravity

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 136, 88, ${alpha})`;
        ctx.shadowColor = "rgba(255, 136, 88, 0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();

        return true;
      });

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);
    document.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden="true"
    />
  );
}
