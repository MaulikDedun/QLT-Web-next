"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const howWeWork = [
  {
    num: "01",
    title: "Listen First",
    body: "We start by understanding your brand's story, audience, and ambitions — not by jumping to solutions.",
  },
  {
    num: "02",
    title: "Find the Edge",
    body: "We uncover what makes you genuinely different and map the emotional territory your audience actually cares about.",
  },
  {
    num: "03",
    title: "Define the Connection",
    body: "We shape the strategic bridge between your brand and your audience — how you show up, speak, and act.",
  },
  {
    num: "04",
    title: "Build the System",
    body: "Every touchpoint gets designed with intention: identity, messaging, motion, and digital presence working as one.",
  },
  {
    num: "05",
    title: "Launch & Evolve",
    body: "We ship with confidence and stay close — iterating as your brand grows and the world responds.",
  },
];

const faqs = [
  {
    q: "What does a branding engagement actually include?",
    a: "Strategy, identity design, messaging architecture, and a full brand system — everything you need to show up consistently across every channel.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most brand projects run 6–12 weeks depending on scope. We move fast without cutting corners.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. We love working with founders who are building something real and need a brand that can grow with them.",
  },
  {
    q: "Can you help with just one part — like messaging or visual identity?",
    a: "Absolutely. We can scope a focused engagement around the specific layer you need most right now.",
  },
  {
    q: "What makes your process different?",
    a: "We don't separate strategy from design. Both happen together, which means the output is always coherent — not just pretty.",
  },
  {
    q: "Do you offer ongoing brand support after launch?",
    a: "Yes. We offer retainer partnerships for brands that want a consistent creative partner as they scale.",
  },
];

const techStack: IconName[] = [
  "figma", "nextjs", "react", "typescript", "tailwindcss",
  "nodejs", "vercel", "github", "graphql", "docker",
  "aws", "framer", "figma", "nextjs", "react", "typescript",
  "tailwindcss", "nodejs", "vercel", "github",
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      className="border-b border-white/[0.08]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-lg text-white/90 md:text-xl">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 text-lg"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-white/50">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function ServiceHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080808] text-white">
      {/* Animated grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
        aria-hidden
      />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.10, 0.16, 0.10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[120px]"
        />
      </div>

      {/* Scroll-parallax content */}
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 md:px-12">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/30"
        >
          Branding · Strategy · Design
        </motion.p>

        {/* Main headline — large, editorial */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.0, ease, delay: 0.15 }}
            className="text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white"
          >
            Brands that
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.0, ease, delay: 0.26 }}
            className="text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white/[0.14]"
          >
            move people
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.0, ease, delay: 0.38 }}
            className="text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white"
          >
            move business.
          </motion.h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
          className="mt-10 max-w-[420px] text-[15px] leading-relaxed text-white/32"
        >
          We build brands that connect on a deeper level, drive real momentum, and make an impact that lasts.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 pt-2"
          >
            <div className="h-1.5 w-1 rounded-full bg-white/40" />
          </motion.div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/20">Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}

// ─── Emotional Branding Section ───────────────────────────────────────────────
function EmotionalBrandingSection() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      {/* Floating ghost text */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
        <div className="absolute -left-4 top-8 text-[clamp(80px,14vw,180px)] font-semibold leading-none tracking-[-0.06em] text-white/[0.04]">
          EMOTIONAL
        </div>
        <div className="absolute -right-4 bottom-8 text-[clamp(80px,14vw,180px)] font-semibold leading-none tracking-[-0.06em] text-violet-300/[0.06]">
          BRANDING
        </div>
      </div>

      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[160px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        {/* Big headline — Refokus style, highlighted blocks */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-[clamp(2.4rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              <span className="inline-block rounded-sm bg-white px-3 py-1 text-[#080808]">Emotional-Driven</span>
              <br />
              <span className="inline-block rounded-sm bg-white px-3 py-1 text-[#080808] mt-3">Branding</span>
            </h2>
            <h3 className="mt-5 text-[clamp(1.4rem,3.5vw,3.2rem)] font-semibold leading-tight tracking-[-0.03em] text-white/70">
              Strategy built for real engagement
            </h3>
          </motion.div>
        </div>

        {/* Two-column body */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left: visual accent card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-10 min-h-[420px]"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.12),transparent_50%)]" />
            {/* Decorative rings */}
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-violet-400/10" />
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-violet-400/[0.07]" />

            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">The relationship</p>
              <p className="mt-6 text-2xl leading-snug text-white/85 md:text-3xl">
                We focus on the relationship between your brand and your audience — because that&apos;s where{" "}
                <span className="text-white">real momentum starts</span> and where{" "}
                <span className="text-white">real engagement happens.</span>
              </p>
            </div>

            {/* Bottom stat row */}
            <div className="absolute bottom-10 left-10 right-10 flex gap-8">
              {[["Brand", "Clarity"], ["Audience", "Alignment"], ["Strategic", "Connection"]].map(([top, bot]) => (
                <div key={top} className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/25">{top}</span>
                  <span className="text-sm text-white/60">{bot}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: body copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="flex flex-col justify-center gap-8"
          >
            <p className="text-base leading-relaxed text-white/55 md:text-lg">
              Our process dives into what makes your brand genuinely unique: your story, your values, your edge. Then, we uncover what actually matters to your audience — the people behind it — tapping into their emotional needs, motivations, and aspirations.
            </p>
            <p className="text-base leading-relaxed text-white/55 md:text-lg">
              The real magic happens when we define the strategic connection between the two, shaping how your brand should show up, speak, and act to create the deepest possible impact.
            </p>
            <p className="text-base leading-relaxed text-white/55 md:text-lg">
              This alignment becomes the foundation for everything — clearer messaging, stronger creative, and a brand experience that just{" "}
              <span className="text-white/85 italic">clicks</span> — internally and out in the world.
            </p>

            <Link
              href="/contact"
              className="btn-flip mt-2 w-fit"
              data-front="Start a project"
              data-back="Let's talk"
              data-magnetic
            >
              Start a project
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── How We Work Section ──────────────────────────────────────────────────────
function HowWeWorkSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      {/* Ghost text */}
      <div className="pointer-events-none absolute right-[-2%] top-10 select-none text-[clamp(80px,16vw,220px)] font-semibold leading-none tracking-[-0.06em] text-cyan-300/[0.04]" aria-hidden>
        PROCESS
      </div>

      {/* Ambient */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[140px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">How we work</p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              Built in five moves.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 md:text-base">
            A focused process that turns brand ambiguity into a system that works everywhere.
          </p>
        </div>

        {/* Steps list */}
        <div className="mt-4 divide-y divide-white/[0.06]">
          {howWeWork.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex cursor-default items-start gap-8 py-8 transition-all duration-300 md:items-center md:gap-12"
            >
              {/* Hover line accent */}
              <motion.div
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease }}
                className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-cyan-400/60 via-violet-400/40 to-transparent"
              />

              <span className="font-mono text-[11px] tracking-[0.25em] text-white/20 transition-colors duration-300 group-hover:text-cyan-300/60">
                {step.num}
              </span>

              <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-12">
                <h3 className={`text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-3xl ${hovered === i ? "text-white" : "text-white/75"}`}>
                  {step.title}
                </h3>
                <p className={`max-w-md text-sm leading-relaxed transition-colors duration-300 md:text-base ${hovered === i ? "text-white/65" : "text-white/35"}`}>
                  {step.body}
                </p>
              </div>

              <motion.span
                animate={{ x: hovered === i ? 4 : 0, opacity: hovered === i ? 1 : 0.2 }}
                transition={{ duration: 0.3, ease }}
                className="hidden text-white/60 md:block"
              >
                →
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack Marquee ───────────────────────────────────────────────────────
function TechMarquee() {
  const row1: IconName[] = ["figma", "nextjs", "react", "typescript", "tailwindcss", "nodejs", "vercel", "github", "graphql", "docker"];
  const row2: IconName[] = ["aws", "framer", "figma", "nextjs", "react", "typescript", "tailwindcss", "nodejs", "vercel", "github"];

  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#080808_0%,transparent_12%,transparent_88%,#080808_100%)] z-10" aria-hidden />

      <div className="mb-10 px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-[11px] uppercase tracking-[0.3em] text-white/25"
        >
          Tools & Technologies
        </motion.p>
      </div>

      {/* Row 1 — left */}
      <div className="flex overflow-hidden mb-4">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...row1, ...row1].map((name, i) => (
            <div key={i} className="flex h-12 w-12 shrink-0 items-center justify-center opacity-30 transition-opacity hover:opacity-70">
              <StackIcon name={name} style={{ width: 36, height: 36 }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        >
          {[...row2, ...row2].map((name, i) => (
            <div key={i} className="flex h-12 w-12 shrink-0 items-center justify-center opacity-20 transition-opacity hover:opacity-60">
              <StackIcon name={name} style={{ width: 36, height: 36 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FaqSection() {
  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      {/* Ambient */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-600/[0.06] blur-[140px]" aria-hidden />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">FAQ</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Questions, answered.
          </h2>
        </motion.div>

        <div className="border-t border-white/[0.08]">
          {faqs.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Book a Demo Section ──────────────────────────────────────────────────────
function BookDemoSection() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-12">
      {/* Animated ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[120px]"
        />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/25">Ready to start?</p>

          <h2 className="mt-6 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
            Let&apos;s build
            <br />
            <span className="text-white/[0.18]">something real.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/40 md:text-lg">
            Book a 30-minute call. We&apos;ll listen, ask the right questions, and tell you exactly how we can help.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_40px_rgba(255,255,255,0.14)]"
              data-cursor="Open"
              data-magnetic
            >
              Book a demo
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="text-[13px] text-white/30 underline underline-offset-4 decoration-white/10 transition-all hover:text-white/60 hover:decoration-white/30"
              data-cursor="View"
            >
              See our work first
            </Link>
          </div>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="mx-auto mt-20 h-px w-full max-w-xs origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/18"
        >
          40+ brands built · 12+ years · No fluff
        </motion.p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <main className="bg-[#080808]">
      <ServiceHero />
      <EmotionalBrandingSection />
      <HowWeWorkSection />
      <TechMarquee />
      <FaqSection />
      <BookDemoSection />
    </main>
  );
}
