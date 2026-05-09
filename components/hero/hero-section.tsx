"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Magnetic grid canvas ─────────────────────────────────────────────────────
// A grid of dots that get pulled toward the cursor — pure geometry, no color
function MagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 28;
    const ROWS = 16;
    let W = 0, H = 0;
    let gx = 0, gy = 0; // grid cell size

    // Each dot has a home position and a current displaced position
    type Dot = { hx: number; hy: number; cx: number; cy: number; vx: number; vy: number };
    let dots: Dot[] = [];

    function build() {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      gx = W / (COLS - 1);
      gy = H / (ROWS - 1);
      dots = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const hx = c * gx;
          const hy = r * gy;
          dots.push({ hx, hy, cx: hx, cy: hy, vx: 0, vy: 0 });
        }
      }
    }

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const RADIUS = 180;
      const STRENGTH = 38;
      const SPRING = 0.08;
      const DAMP = 0.72;

      for (const d of dots) {
        const dx = d.hx - mx;
        const dy = d.hy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = d.hx;
        let ty = d.hy;

        if (dist < RADIUS && dist > 0) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          tx = d.hx + (dx / dist) * force;
          ty = d.hy + (dy / dist) * force;
        }

        d.vx = (d.vx + (tx - d.cx) * SPRING) * DAMP;
        d.vy = (d.vy + (ty - d.cy) * SPRING) * DAMP;
        d.cx += d.vx;
        d.cy += d.vy;

        // dot opacity based on distance from cursor
        const distFromCursor = Math.sqrt((d.cx - mx) ** 2 + (d.cy - my) ** 2);
        const proximity = Math.max(0, 1 - distFromCursor / 320);
        const baseOpacity = 0.10;
        const opacity = baseOpacity + proximity * 0.22;

        ctx.beginPath();
        ctx.arc(d.cx, d.cy, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      // draw connecting lines between nearby displaced dots
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        // only connect to right and bottom neighbor
        const right = dots[i + 1];
        const below = dots[i + COLS];

        if (right && Math.floor(i / COLS) === Math.floor((i + 1) / COLS)) {
          const d = Math.sqrt((a.cx - right.cx) ** 2 + (a.cy - right.cy) ** 2);
          const stretch = Math.abs(d - gx) / gx;
          const alpha = Math.max(0, 0.055 - stretch * 0.04);
          if (alpha > 0.005) {
            ctx.beginPath();
            ctx.moveTo(a.cx, a.cy);
            ctx.lineTo(right.cx, right.cy);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (below) {
          const d = Math.sqrt((a.cx - below.cx) ** 2 + (a.cy - below.cy) ** 2);
          const stretch = Math.abs(d - gy) / gy;
          const alpha = Math.max(0, 0.055 - stretch * 0.04);
          if (alpha > 0.005) {
            ctx.beginPath();
            ctx.moveTo(a.cx, a.cy);
            ctx.lineTo(below.cx, below.cy);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    build();
    tick();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

// ─── Char-by-char headline reveal ─────────────────────────────────────────────
function AnimatedHeadline({ text, delay = 0, dim = false }: { text: string; delay?: number; dim?: boolean }) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <div className={`overflow-hidden leading-[0.88]`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease, delay }}
        className={`text-[clamp(2.8rem,9vw,8.8rem)] font-semibold tracking-[-0.04em] ${dim ? "text-white/[0.14]" : "text-white"}`}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.22em]">
            {word.split("").map((char) => {
              const ci = charIndex++;
              return (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.01, delay: delay + 0.55 + ci * 0.018 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Horizontal ticker ────────────────────────────────────────────────────────
const TICKER = [
  "Web Design", "·", "SaaS Platforms", "·", "UI Systems", "·",
  "Motion Design", "·", "Engineering", "·", "Growth Strategy", "·",
  "Web Design", "·", "SaaS Platforms", "·", "UI Systems", "·",
  "Motion Design", "·", "Engineering", "·", "Growth Strategy", "·",
];

function Ticker() {
  return (
    <div className="flex overflow-hidden border-t border-white/[0.06] py-5">
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {[...TICKER, ...TICKER].map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap text-[13px] uppercase tracking-[0.22em] ${
              item === "·" ? "text-white/18" : "text-white/35"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080808] text-white">

      {/* magnetic dot grid — the background IS the interaction */}
      <MagneticGrid />

      {/* very subtle radial center vignette — no color, just depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(8,8,8,0.65) 100%)",
        }}
        aria-hidden
      />

      {/* ── top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.05 }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pt-10 md:px-12"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
          Product studio
        </span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/35" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/50" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/25">
            Available for projects
          </span>
        </div>
      </motion.div>

      {/* ── headline block — vertically centered ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 md:px-12">
        <div className="space-y-0">
          <AnimatedHeadline text="We build digital" delay={0.1} />
          <AnimatedHeadline text="products that feel" delay={0.22} dim />
          <AnimatedHeadline text="as good as they work." delay={0.34} />
        </div>

        {/* sub-copy + CTAs — revealed after headline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
          className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-[340px] text-[15px] leading-relaxed text-white/32">
            From strategy to shipped — we close the gap between your vision and what people actually see.
          </p>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]"
                data-cursor="Open"
              >
                Start a project
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/portfolio"
                className="text-[13px] text-white/28 underline underline-offset-4 decoration-white/10 transition-all hover:text-white/60 hover:decoration-white/30"
                data-cursor="View"
              >
                See our work
              </Link>
            </div>

            {/* social proof line */}
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/18">
              40+ products shipped · 12+ years
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── ticker strip at bottom ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="relative z-10"
      >
        <Ticker />
      </motion.div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}
