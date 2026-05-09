"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ProjectItem } from "@/lib/site-data";

type Props = { items: ProjectItem[]; intervalMs?: number };

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

export function FeaturedWorkCarousel({ items, intervalMs = 4800 }: Props) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [hovered, setHovered] = useState(false);
  const paused = useRef(false);
  const reduced = useReducedMotion();

  const max = items.length - 1;

  function go(next: number, direction?: number) {
    const clamped = clamp(next, 0, max);
    setDir(direction ?? (next > active ? 1 : -1));
    setActive(clamped);
  }

  function goWrap(next: number) {
    const wrapped = ((next % items.length) + items.length) % items.length;
    setDir(next > active ? 1 : -1);
    setActive(wrapped);
  }

  // autoscroll
  useEffect(() => {
    if (reduced || items.length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) {
        setDir(1);
        setActive((v) => (v + 1) % items.length);
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs, reduced]);

  const item = items[active];

  // slide variants — no blur, clean translate
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="mt-12 select-none">
      {/* ── main stage ─────────────────────────────────────────────────────── */}
      <div
        className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0e17]"
        style={{ minHeight: 480 }}
        onMouseEnter={() => { paused.current = true; setHovered(true); }}
        onMouseLeave={() => { paused.current = false; setHovered(false); }}
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={item.slug}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            {/* cover */}
            <Image
              src={item.coverImageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />

            {/* base scrim — always present */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-[#070a12]/55 to-transparent" />

            {/* cyan scan-line sweep on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={false}
              animate={hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(6,182,212,0.06)_50%,transparent_100%)] bg-[size:100%_200%] animate-[scanline_2.4s_ease-in-out_infinite]" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            </motion.div>

            {/* corner accent — top-right */}
            <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Case Study</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── card content (stays in place, text crossfades) ── */}
        <div className="relative flex h-full min-h-[480px] flex-col justify-end p-8 md:p-12">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={item.slug + "-text"}
              custom={dir}
              variants={{
                enter: (d: number) => ({ y: d > 0 ? 24 : -24, opacity: 0 }),
                center: { y: 0, opacity: 1 },
                exit: (d: number) => ({ y: d > 0 ? -16 : 16, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
            >
              <h3 className="text-3xl leading-tight tracking-tight text-white md:text-5xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                {item.summary}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {item.highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs text-white/60 backdrop-blur-sm transition-colors duration-200 hover:border-cyan-300/30 hover:text-cyan-200"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="group/cta inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.08] px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-300/40 hover:bg-gradient-to-r hover:from-cyan-400/15 hover:to-violet-400/10 hover:shadow-[0_0_32px_rgba(6,182,212,0.18)]"
                  data-cursor="Open"
                >
                  View Case Study
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-white/10 text-xs transition-all duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:border-cyan-300/50 group-hover/cta:bg-cyan-300/15 group-hover/cta:text-cyan-100">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* drag handler */}
        <DragLayer onSwipe={(d) => goWrap(active + d)} />
      </div>

      {/* ── controls ───────────────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-between gap-4">
        {/* dot nav */}
        <div className="flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${it.title}`}
              className="group relative h-1 overflow-hidden rounded-full bg-white/15 transition-all duration-300"
              style={{ width: i === active ? 32 : 12 }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: intervalMs / 1000, ease: "linear" }}
                  key={active}
                />
              )}
            </button>
          ))}
        </div>

        {/* counter + arrows */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/35">
            <span className="text-white/70">0{active + 1}</span>
            {" / "}
            0{items.length}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(active - 1, -1)}
              disabled={active === 0}
              aria-label="Previous"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/60 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(active + 1, 1)}
              disabled={active === max}
              aria-label="Next"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white/60 transition-all hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-25"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── thin invisible drag layer so the card is swipeable ──────────────────────
function DragLayer({ onSwipe }: { onSwipe: (dir: number) => void }) {
  const x = useMotionValue(0);
  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (info.offset.x < -50) onSwipe(1);
        else if (info.offset.x > 50) onSwipe(-1);
        x.set(0);
      }}
    />
  );
}
