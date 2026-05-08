"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectItem } from "@/lib/site-data";

type FeaturedWorkCarouselProps = {
  items: ProjectItem[];
};

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

type ProjectSlideProps = {
  item: ProjectItem;
  index: number;
  active: number;
  stepPx: number;
  onActivate: (index: number) => void;
};

function ProjectSlide({ item, index, active, stepPx, onActivate }: ProjectSlideProps) {
  const isActive = index === active;

  return (
    <motion.article
      className="noise-overlay relative shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),rgba(255,255,255,0)),linear-gradient(180deg,rgba(109,40,217,0.16),rgba(6,182,212,0.06)),#070a12]"
      style={{ width: stepPx }}
      animate={{
        scale: isActive ? 1 : 0.94,
        y: isActive ? 0 : 10,
        opacity: isActive ? 1 : 0.62,
        filter: isActive ? "blur(0px)" : "blur(0.6px)",
      }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      onClick={() => onActivate(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate(index);
        if (e.key === "ArrowRight") onActivate(active + 1);
        if (e.key === "ArrowLeft") onActivate(active - 1);
      }}
      data-cursor="Explore"
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out ${
          isActive ? "opacity-100" : ""
        }`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(109,40,217,0.12),transparent_55%)]" />
      </div>

      <div className="relative h-64 md:h-[24rem]">
        <Image src={item.coverImageUrl} alt={item.title} fill sizes="(max-width: 768px) 92vw, 900px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Case Study</p>
        <h3 className="mt-2 text-2xl md:text-3xl">{item.title}</h3>
        <p className="mt-3 max-w-2xl text-sm text-white/75">{item.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2 text-xs text-white/75">
          {item.highlights.slice(0, 3).map((h) => (
            <li key={h} className="rounded-full border border-white/15 bg-black/20 px-3 py-1">
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={`/portfolio/${item.slug}`}
            className="group/cta inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-gradient-to-r hover:from-cyan-300/20 hover:via-white/10 hover:to-purple-300/20 hover:shadow-[0_14px_40px_rgba(6,182,212,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/40"
            data-cursor="Open"
          >
            <span>View Case Study</span>
            <span className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-black/20 text-white/80 transition-all duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:border-cyan-200/60 group-hover/cta:bg-cyan-300/15 group-hover/cta:text-cyan-50">
              →
            </span>
          </Link>
          <span className="text-xs text-white/55">Drag or use arrows to browse.</span>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedWorkCarousel({ items }: FeaturedWorkCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [stepPx, setStepPx] = useState(920);
  const dragStartX = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, items.length - 1);

  useEffect(() => {
    const element = trackRef.current;
    if (!element) return;

    const compute = () => {
      // Keep the hero card smaller so the section doesn't feel "too big".
      // 84vw on mobile/tablet, ~780px on desktop.
      const w = element.clientWidth;
      const next = clamp(Math.round(w * 0.84), 320, 820);
      setStepPx(next);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(element);
    return () => ro.disconnect();
  }, []);

  const dragBounds = useMemo(() => {
    // We center the active slide by translating the track. Boundaries prevent overscroll.
    const left = -maxIndex * stepPx;
    return { left, right: 0 };
  }, [maxIndex, stepPx]);

  useEffect(() => {
    x.set(-active * stepPx);
  }, [active, stepPx, x]);

  const goTo = (index: number) => {
    setActive(clamp(index, 0, maxIndex));
  };

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (paused) return;
    if (items.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [items.length, paused, shouldReduceMotion]);

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.2em] text-white/55">
          <span className="text-white/80">0{active + 1}</span>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-white/55">0{items.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all enabled:hover:border-white/25 enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous project"
            data-cursor="Prev"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === maxIndex}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all enabled:hover:border-cyan-200/40 enabled:hover:bg-cyan-300/10 enabled:hover:text-cyan-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next project"
            data-cursor="Next"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden" ref={trackRef}>
        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-16 bg-gradient-to-r from-[#070a12] to-transparent md:block" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-16 bg-gradient-to-l from-[#070a12] to-transparent md:block" />

        <motion.div
          className="flex gap-6"
          style={{ x }}
          drag="x"
          dragConstraints={dragBounds}
          dragElastic={0.06}
          onDragStart={() => {
            dragStartX.current = x.get();
            setPaused(true);
          }}
          onDragEnd={(_, info) => {
            // PRD-like snap: bias with velocity and displacement, then clamp.
            const current = -dragStartX.current / stepPx;
            const displacement = -(x.get() - dragStartX.current) / stepPx;
            const velocityBias = -info.velocity.x / 1800;
            const next = clamp(Math.round(current + displacement + velocityBias), 0, maxIndex);
            goTo(next);
            window.setTimeout(() => setPaused(false), 900);
          }}
          animate={{ x: -active * stepPx }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {items.map((item, index) => (
            <ProjectSlide
              key={item.slug}
              item={item}
              index={index}
              active={active}
              stepPx={stepPx}
              onActivate={goTo}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 to-purple-300/80"
          animate={{ width: `${items.length ? ((active + 1) / items.length) * 100 : 0}%` }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </div>
  );
}

