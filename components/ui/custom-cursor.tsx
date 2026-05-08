"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [label, setLabel] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { damping: 40, stiffness: 450 });
  const y = useSpring(cursorY, { damping: 40, stiffness: 450 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const value = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(value?.dataset.cursor ?? "");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver, true);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver, true);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 min-w-9 items-center justify-center rounded-full border border-white/35 bg-[#0f172a]/90 px-2 text-[9px] uppercase tracking-[0.16em] text-white shadow-[0_8px_30px_rgba(2,6,23,0.35)] backdrop-blur-xl md:flex"
      style={{ x, y }}
      animate={{ scale: label ? 1.2 : 1, opacity: 1, width: label ? 84 : 36 }}
      transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
    >
      <span className="select-none">{label}</span>
    </motion.div>
  );
}
