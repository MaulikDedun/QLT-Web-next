"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FeaturedWorkBackdrop() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/40" />

      {/* Clean blueprint-style illustration (animated drift), kept subtle and non-messy */}
      <motion.svg
        viewBox="0 0 1200 520"
        className="absolute inset-0 h-full w-full opacity-[0.20]"
        initial={{ x: -8, y: 6 }}
        animate={{ x: [ -8, 8, -8 ], y: [ 6, -6, 6 ] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
      >
        <defs>
          <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(11,18,32,0.10)" strokeWidth="1" />
          </pattern>
          <linearGradient id="bp" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(6,182,212,0.22)" />
            <stop offset="1" stopColor="rgba(109,40,217,0.18)" />
          </linearGradient>
          <radialGradient id="fade" cx="50%" cy="35%" r="65%">
            <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
          </radialGradient>
        </defs>

        <rect width="1200" height="520" fill="url(#grid)" />
        <rect width="1200" height="520" fill="url(#fade)" opacity="0.6" />

        <g fill="none" stroke="url(#bp)" strokeWidth="2">
          <path d="M180 150 C 310 80, 420 80, 520 150 S 720 230, 850 160" opacity="0.9" />
          <path d="M260 360 C 380 290, 520 310, 640 360 S 860 430, 980 360" opacity="0.55" />
          <path d="M120 260 Q 360 180 600 260 T 1080 260" opacity="0.35" />
        </g>

        <g>
          {[
            { x: 220, y: 150, r: 6 },
            { x: 520, y: 150, r: 6 },
            { x: 850, y: 160, r: 6 },
            { x: 260, y: 360, r: 5 },
            { x: 640, y: 360, r: 5 },
            { x: 980, y: 360, r: 5 },
          ].map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="rgba(6,182,212,0.22)" stroke="rgba(11,18,32,0.18)" strokeWidth="1" />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}

