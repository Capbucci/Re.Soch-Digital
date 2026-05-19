import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!visible) setVisible(true);
      });
    };

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    const bindHover = () => {
      const els = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    bindHover();
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-primary/50"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 40 : clicked ? 16 : 28,
          height: hovered ? 40 : clicked ? 16 : 28,
          opacity: visible ? (hovered ? 1 : 0.5) : 0,
          boxShadow: hovered
            ? "0 0 16px 4px rgba(255,136,88,0.5)"
            : "0 0 0px 0px rgba(255,136,88,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-primary"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 6 : clicked ? 12 : 7,
          height: hovered ? 6 : clicked ? 12 : 7,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
      />
    </>
  );
}
