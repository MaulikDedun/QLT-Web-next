"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/lib/site-data";
import { FeaturedWorkCarousel } from "@/components/portfolio/featured-work-carousel";

const ease = [0.76, 0, 0.24, 1] as const;
const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "40+", label: "Products shipped" },
  { value: "12+", label: "Years of craft" },
  { value: "98%", label: "Client retention" },
  { value: "4",   label: "Core disciplines" },
];

const PHILOSOPHY = [
  {
    num: "01",
    title: "System Before Screen",
    body: "We design the architecture before we design the interface. Every component, every data contract, every interaction pattern is planned as part of a coherent system — not assembled after the fact.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Design Empowered, Technology Driven",
    body: "Great design without engineering rigour is decoration. Great engineering without design thinking is infrastructure. We refuse to separate the two — every decision is made at the intersection.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Human Focused",
    body: "Products are used by people, not personas. We research real behaviour, test with real users, and measure outcomes that matter to real businesses — not vanity metrics that look good in decks.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Experience Driven",
    body: "The experience is the product. Speed, motion, clarity, and consistency aren't polish — they're the core. We treat every interaction as an opportunity to build trust.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "05",
    title: "Transparent Collaboration",
    body: "We work alongside clients, not for them. You see every decision, every tradeoff, every draft. The best outcomes come from shared context — not handoffs over a wall.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "06",
    title: "Built to Last",
    body: "We don't optimise for the demo. We optimise for the product that exists six months after launch — when the team has grown, the data has scaled, and the edge cases have arrived.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
  },
];

const CYCLE = [
  { id: 0, label: "Discover",  angle: -90, desc: "We map your goals, audience, and constraints before anything else. Clarity first." },
  { id: 1, label: "Define",    angle: -30, desc: "Strategy, architecture, and scope locked in. No surprises mid-build." },
  { id: 2, label: "Design",    angle:  30, desc: "Systems before screens. Tokens, components, and motion language established." },
  { id: 3, label: "Build",     angle:  90, desc: "Incremental delivery. Each layer tested before the next begins." },
  { id: 4, label: "Launch",    angle: 150, desc: "Deploy with confidence. Analytics, error tracking, and rollback ready." },
  { id: 5, label: "Scale",     angle: 210, desc: "Iteration loops that compound. Every release makes the next one faster." },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const op = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080808] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }} aria-hidden />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div animate={{ scale: [1,1.12,1], opacity:[0.12,0.20,0.12] }}
          transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
          className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-violet-600/18 blur-[150px]" />
        <motion.div animate={{ scale: [1,1.08,1], opacity:[0.08,0.15,0.08] }}
          transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:2.5 }}
          className="absolute -right-40 bottom-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-[130px]" />
      </div>

      <motion.div style={{ y, opacity: op }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-32 pb-16 md:px-12">
        <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, ease, delay:0.1 }}
          className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/28">
          About · QuantaTechLabs
        </motion.p>

        {[
          { text: "We build",       dim: false, delay: 0.16 },
          { text: "digital things", dim: true,  delay: 0.26 },
          { text: "that last.",     dim: false, delay: 0.36 },
        ].map(({ text, dim, delay }) => (
          <div key={text} className="overflow-hidden">
            <motion.h1 initial={{ y:"108%" }} animate={{ y:"0%" }}
              transition={{ duration:1.0, ease, delay }}
              className={`text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] ${dim ? "text-white/[0.13]" : "text-white"}`}>
              {text}
            </motion.h1>
          </div>
        ))}

        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, ease, delay:0.9 }}
          className="mt-10 max-w-[400px] text-[15px] leading-relaxed text-white/30">
          A product studio that closes the gap between vision and reality — through sharp strategy, precise engineering, and design that earns attention.
        </motion.p>

        {/* Scroll cue */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:1.3 }}
          className="mt-16 flex items-center gap-3">
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 pt-2">
            <div className="h-1.5 w-1 rounded-full bg-white/40" />
          </motion.div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/18">Scroll to explore</span>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}

// ─── What is QuantaTechLabs ───────────────────────────────────────────────────
function WhatWeAreSection() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[140px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          {/* Left */}
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.75, ease }}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Who we are</p>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              A studio that thinks
              <br />
              <span className="text-white/[0.22]">in systems,</span>
              <br />
              builds in craft.
            </h2>
            <div className="mt-8 space-y-5">
              <p className="text-base leading-relaxed text-white/52 md:text-lg">
                QuantaTechLabs is a product engineering and design studio. We work with founders, product teams, and growth-stage companies to build digital products that are fast, coherent, and built to scale.
              </p>
              <p className="text-base leading-relaxed text-white/52 md:text-lg">
                We don&apos;t separate strategy from design from engineering. All three happen together — which is why our products feel intentional at every layer, not just on the surface.
              </p>
            </div>
            <Link href="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_28px_rgba(255,255,255,0.12)]"
              data-cursor="Open">
              Work with us
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>

          {/* Right: stat grid */}
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.75, ease, delay:0.1 }}
            className="grid grid-cols-2 gap-4 content-start">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:0.15 + i*0.07, ease }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-7 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/[0.08] blur-[40px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="text-[clamp(2.2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  {s.value}
                </p>
                <p className="mt-3 text-sm text-white/40">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Philosophy — Refokus accordion with image swap ───────────────────────────
function PhilosophySection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-600/[0.07] blur-[140px]" aria-hidden />
      {/* Ghost text */}
      <div className="pointer-events-none absolute -right-4 top-8 select-none text-[clamp(80px,14vw,180px)] font-semibold leading-none tracking-[-0.06em] text-white/[0.03]" aria-hidden>
        THINKING
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, ease }}
          className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Our philosophy</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Design
            <br />
            Thinking.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          {/* Accordion list */}
          <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {PHILOSOPHY.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={item.num}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, amount:0.2 }} transition={{ duration:0.45, delay:i*0.05, ease }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center gap-6 py-6 text-left"
                    aria-expanded={isOpen}>
                    <span className={`font-mono text-[11px] tracking-[0.25em] transition-colors duration-300 ${isOpen ? "text-cyan-300/70" : "text-white/20"}`}>
                      {item.num}
                    </span>
                    <span className={`flex-1 text-xl font-semibold tracking-tight transition-colors duration-300 md:text-2xl ${isOpen ? "text-white" : "text-white/65 group-hover:text-white/85"}`}>
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration:0.28, ease }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-colors duration-300 ${isOpen ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200" : "border-white/12 text-white/30"}`}>
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.38, ease }}
                        className="overflow-hidden">
                        <p className="pb-6 pl-[calc(11px+1.5rem)] text-base leading-relaxed text-white/48 md:text-lg">
                          {item.body}
                        </p>
                        {/* Mobile image */}
                        <div className="relative mb-6 ml-[calc(11px+1.5rem)] overflow-hidden rounded-2xl lg:hidden" style={{ aspectRatio:"16/9" }}>
                          <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#06070b]/60 to-transparent" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Sticky image panel — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div key={open}
                  initial={{ opacity:0, scale:0.97, filter:"blur(6px)" }}
                  animate={{ opacity:1, scale:1, filter:"blur(0px)" }}
                  exit={{ opacity:0, scale:0.98, filter:"blur(4px)" }}
                  transition={{ duration:0.45, ease }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/[0.08]"
                  style={{ aspectRatio:"3/4" }}>
                  {open >= 0 && open < PHILOSOPHY.length && (
                    <>
                      <Image src={PHILOSOPHY[open].image} alt={PHILOSOPHY[open].title}
                        fill sizes="420px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06070b]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                          {PHILOSOPHY[open].num}
                        </span>
                        <p className="mt-2 text-lg font-semibold text-white/80">{PHILOSOPHY[open].title}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Work Cycle — interactive orbital ring ────────────────────────────────────
function WorkCycleSection() {
  const [active, setActive] = useState(0);
  const R = 160; // orbit radius (px, used in SVG viewBox)

  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div animate={{ scale:[1,1.12,1], opacity:[0.08,0.16,0.08] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>
      {/* Ghost text */}
      <div className="pointer-events-none absolute -left-4 top-8 select-none text-[clamp(80px,14vw,180px)] font-semibold leading-none tracking-[-0.06em] text-white/[0.03]" aria-hidden>
        CYCLE
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, ease }}
          className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">How we work</p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              The cycle
              <br />
              <span className="text-white/[0.18]">of craft.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/38 md:text-base">
            Six phases. One continuous loop. Each project ends where the next begins.
          </p>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          {/* Orbital diagram */}
          <motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.8, ease }}
            className="flex items-center justify-center">
            <div className="relative" style={{ width: 380, height: 380 }}>
              <svg viewBox="-200 -200 400 400" className="absolute inset-0 w-full h-full" aria-hidden>
                {/* Outer orbit ring */}
                <circle cx="0" cy="0" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                {/* Inner decorative rings */}
                <circle cx="0" cy="0" r={R * 0.55} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="0" cy="0" r={R * 0.25} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                {/* Connector lines from active node to center */}
                {CYCLE.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const nx = Math.cos(rad) * R;
                  const ny = Math.sin(rad) * R;
                  return (
                    <line key={i} x1="0" y1="0" x2={nx} y2={ny}
                      stroke={i === active ? "rgba(6,182,212,0.25)" : "rgba(255,255,255,0.04)"}
                      strokeWidth={i === active ? "1.5" : "0.5"}
                      style={{ transition: "stroke 0.4s, stroke-width 0.4s" }} />
                  );
                })}

                {/* Center dot */}
                <circle cx="0" cy="0" r="6" fill="rgba(255,255,255,0.12)" />
                <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.5)" />
              </svg>

              {/* Orbit nodes */}
              {CYCLE.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const nx = Math.cos(rad) * R;
                const ny = Math.sin(rad) * R;
                const isActive = i === active;
                // Convert SVG coords to CSS (SVG viewBox is -200 to 200, container is 380px)
                const scale = 380 / 400;
                const cx = (nx + 200) * scale;
                const cy = (ny + 200) * scale;

                return (
                  <button key={node.id}
                    onClick={() => setActive(i)}
                    style={{ left: cx, top: cy, transform: "translate(-50%,-50%)" }}
                    className="absolute flex flex-col items-center gap-1.5 group"
                    aria-label={node.label}>
                    {/* Node dot */}
                    <motion.div
                      animate={isActive ? { scale:1.2 } : { scale:1 }}
                      transition={{ duration:0.3, ease }}
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-cyan-300/50 bg-cyan-300/15 shadow-[0_0_24px_rgba(6,182,212,0.35)]"
                          : "border-white/15 bg-[#080808] group-hover:border-white/30 group-hover:bg-white/[0.06]"
                      }`}>
                      <div className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${isActive ? "bg-cyan-300" : "bg-white/25 group-hover:bg-white/50"}`} />
                      {/* Ping on active */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-cyan-300/20" />
                      )}
                    </motion.div>
                    {/* Label */}
                    <span className={`whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-cyan-200" : "text-white/30 group-hover:text-white/60"}`}>
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active step detail */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity:0, y:20, filter:"blur(6px)" }}
                animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                exit={{ opacity:0, y:-12, filter:"blur(4px)" }}
                transition={{ duration:0.45, ease }}
                className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.025] p-10 md:p-12">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.10),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.08),transparent_50%)]" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">
                      Phase 0{active + 1}
                    </span>
                    <span className="h-px w-12 bg-gradient-to-r from-cyan-300/40 to-transparent" />
                  </div>

                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {CYCLE[active].label}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-white/55 md:text-lg">
                    {CYCLE[active].desc}
                  </p>

                  {/* Step dots */}
                  <div className="mt-10 flex items-center gap-2">
                    {CYCLE.map((_, i) => (
                      <button key={i} onClick={() => setActive(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-cyan-300" : "w-1.5 bg-white/15 hover:bg-white/30"}`}
                        aria-label={`Go to phase ${i+1}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Work ────────────────────────────────────────────────────────────
function FeaturedWorkSection() {
  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      <div className="pointer-events-none absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[130px]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/[0.07] blur-[120px]" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_72px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.3 }} transition={{ duration:0.65, ease }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Featured work</p>
            <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              Case studies,
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                built to last.
              </span>
            </h2>
          </div>
          <Link href="/portfolio"
            className="text-hover-link shrink-0 text-sm uppercase tracking-[0.15em] text-white/55"
            data-cursor="View">
            Explore All →
          </Link>
        </motion.div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
        <FeaturedWorkCarousel items={projects} />
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div animate={{ scale:[1,1.15,1], opacity:[0.14,0.22,0.14] }}
          transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
          className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.10,0.17,0.10] }}
          transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:3 }}
          className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[130px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage:GRAIN, backgroundSize:"200px 200px" }} aria-hidden />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.4 }} transition={{ duration:0.8, ease }}>
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/25">Ready to build?</p>
          <h2 className="mt-6 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
            Let&apos;s make
            <br />
            <span className="text-white/[0.16]">something real.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/38 md:text-lg">
            Book a 30-minute call. We&apos;ll listen, ask the right questions, and tell you exactly how we can help.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_40px_rgba(255,255,255,0.14)]"
              data-cursor="Open" data-magnetic>
              Book a demo
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/portfolio"
              className="text-[13px] text-white/28 underline underline-offset-4 decoration-white/10 transition-all hover:text-white/55 hover:decoration-white/28"
              data-cursor="View">
              See our work first
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
          transition={{ duration:1.2, ease, delay:0.3 }}
          className="mx-auto mt-20 h-px w-full max-w-xs origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.5 }}
          className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/16">
          40+ products shipped · 12+ years · No fluff
        </motion.p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="bg-[#080808]">
      <AboutHero />
      <WhatWeAreSection />
      <PhilosophySection />
      <WorkCycleSection />
      <FeaturedWorkSection />
      <CtaSection />
    </main>
  );
}
