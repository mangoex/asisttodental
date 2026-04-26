"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });

  const [hover, setHover] = useState(false);
  const [variant, setVariant] = useState<"default" | "cta" | "text">("default");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      document.body.style.cursor = "auto";
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tag = t.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea"
      );
      if (!tag) {
        setHover(false);
        setVariant("default");
        return;
      }
      setHover(true);
      const v = tag.getAttribute("data-cursor");
      if (v === "text") setVariant("text");
      else if (tag.tagName === "INPUT" || tag.tagName === "TEXTAREA")
        setVariant("text");
      else setVariant("cta");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === "cta" ? 56 : variant === "text" ? 4 : 12;
  const ringSize = variant === "cta" ? 56 : 36;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", damping: 22, stiffness: 320 }}
          className="rounded-full bg-cream"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: hover ? 0.4 : 0.15,
            borderColor: variant === "cta" ? "#94E5C0" : "#F5F3EE",
          }}
          transition={{ type: "spring", damping: 24, stiffness: 240 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
  );
}
