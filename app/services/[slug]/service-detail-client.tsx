"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { FeaturedWorkCarousel } from "@/components/portfolio/featured-work-carousel";
import type { ServicePageData, ProjectItem } from "@/lib/site-data";

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Shared helpers ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.32em] text-white/30">
      {children}
    </p>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.055, ease }}
      className="border-b border-white/[0.08]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-lg text-white/88 md:text-xl">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28, ease }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 text-lg"
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
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-white/48">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ServiceHero({ data }: { data: ServicePageData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080808] text-white">
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />

      {/* Ambient blobs — accent colours per service */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full blur-[150px]"
          style={{ background: data.accentFrom + "33" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute -right-40 bottom-1/4 h-[420px] w-[420px] rounded-full blur-[130px]"
          style={{ background: data.accentTo + "28" }}
        />
      </div>

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 md:px-12"
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="mb-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/25 transition-colors hover:text-white/55"
          >
            ← Services
          </Link>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.12 }}
          className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/28"
        >
          {data.heroEyebrow}
        </motion.p>

        {/* Headline — three lines, middle dimmed */}
        <div className="space-y-0">
          {[
            { text: data.heroLine1, dim: false, delay: 0.18 },
            { text: data.heroLine2, dim: true,  delay: 0.28 },
            { text: data.heroLine3, dim: false, delay: 0.38 },
          ].map(({ text, dim, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.0, ease, delay }}
                className={`text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] ${
                  dim ? "text-white/[0.14]" : "text-white"
                }`}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Sub-copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
          className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-[380px] text-[15px] leading-relaxed text-white/32">
            {data.heroSub}
          </p>
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
          </div>
        </motion.div>

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
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/18">Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}

// ─── Why Section ──────────────────────────────────────────────────────────────
function WhySection({ data }: { data: ServicePageData }) {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      {/* Ghost text */}
      <div
        className="pointer-events-none absolute -right-4 top-6 select-none text-[clamp(60px,12vw,160px)] font-semibold leading-none tracking-[-0.06em] opacity-[0.04]"
        aria-hidden
      >
        WHY
      </div>

      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: data.accentFrom + "18" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left: headline + body */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease }}
            className="flex flex-col justify-center"
          >
            <SectionLabel>Why it matters</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              {data.whyHeadline}
            </h2>
            <div className="mt-8 space-y-5">
              {data.whyBody.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-white/52 md:text-lg">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right: stat card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease, delay: 0.1 }}
            className="flex items-center"
          >
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] p-10 md:p-14">
              {/* Inner glow */}
              <div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${data.accentFrom}22, transparent 55%), radial-gradient(circle at 80% 80%, ${data.accentTo}18, transparent 50%)`,
                }}
              />
              {/* Decorative ring */}
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/[0.05]" />

              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/28">Key outcome</p>
                <p
                  className="mt-6 text-[clamp(3.5rem,8vw,6rem)] font-semibold leading-none tracking-[-0.04em]"
                  style={{ color: data.accentFrom }}
                >
                  {data.whyCardStat}
                </p>
                <p className="mt-5 max-w-xs text-lg leading-snug text-white/70">
                  {data.whyCardLabel}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities Grid ────────────────────────────────────────────────────────
function CapabilitiesSection({ data }: { data: ServicePageData }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      {/* Ghost text */}
      <div
        className="pointer-events-none absolute -left-4 top-8 select-none text-[clamp(60px,12vw,160px)] font-semibold leading-none tracking-[-0.06em] opacity-[0.035]"
        aria-hidden
      >
        WHAT
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full blur-[140px]"
        style={{ background: data.accentTo + "14" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel>What we do</SectionLabel>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              The full capability set.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/38 md:text-base">
            Every engagement draws from this stack — scoped to what your project actually needs.
          </p>
        </motion.div>

        <div className="grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {data.capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-[#06070b] p-8 transition-colors duration-300 hover:bg-white/[0.03] md:p-10"
            >
              {/* Accent line top */}
              <motion.div
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute left-0 top-0 h-px w-full origin-left"
                style={{ background: `linear-gradient(to right, ${data.accentFrom}80, transparent)` }}
              />

              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] mb-5"
                style={{
                  background: data.accentFrom + "18",
                  color: data.accentFrom,
                  border: `1px solid ${data.accentFrom}30`,
                }}
              >
                {cap.tag}
              </span>

              <h3 className="text-xl font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
                {cap.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/42 transition-colors duration-300 group-hover:text-white/58">
                {cap.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Growth / Metrics Section ─────────────────────────────────────────────────
function GrowthSection({ data }: { data: ServicePageData }) {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      {/* Animated ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
          style={{ background: `linear-gradient(135deg, ${data.accentFrom}22, ${data.accentTo}18)` }}
        />
      </div>

      {/* Horizontal rule */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="mb-20 max-w-3xl"
        >
          <SectionLabel>Growth impact</SectionLabel>
          <h2 className="mt-5 text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            {data.growthHeadline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/45 md:text-lg">
            {data.growthSub}
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-8 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              {/* Corner glow on hover */}
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: data.accentFrom + "40" }}
              />

              <p
                className="text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]"
                style={{ color: data.accentFrom }}
              >
                {m.value}
              </p>
              <p className="mt-4 text-base font-medium text-white/80">{m.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/38">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Work ────────────────────────────────────────────────────────────
function FeaturedWorkSection({ data, projects }: { data: ServicePageData; projects: ProjectItem[] }) {
  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      {/* Scattered ghost icons atmosphere — same pattern as homepage */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full blur-[130px]"
          style={{ background: data.accentFrom + "12" }}
        />
        <div
          className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: data.accentTo + "10" }}
        />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_72px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <SectionLabel>Featured work</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              Case studies,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${data.accentFrom}, white, ${data.accentTo})` }}
              >
                built to last.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/48">
              Real projects. Real outcomes. Every case study reflects the same standard we bring to yours.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="text-hover-link shrink-0 text-sm uppercase tracking-[0.15em] text-white/55"
            data-cursor="View"
          >
            Explore All →
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        <FeaturedWorkCarousel items={projects} />
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────
function ProcessSection({ data }: { data: ServicePageData }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      <div
        className="pointer-events-none absolute -right-10 top-10 h-[360px] w-[360px] rounded-full blur-[130px]"
        style={{ background: data.accentFrom + "12" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Three moves.
            <br />
            <span className="text-white/[0.18]">No wasted steps.</span>
          </h2>
        </motion.div>

        <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
          {data.process.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex cursor-default items-start gap-8 py-10 transition-all duration-300 md:items-center md:gap-16"
            >
              {/* Hover accent line */}
              <motion.div
                animate={{ scaleX: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.32, ease }}
                className="absolute left-0 top-0 h-px w-full origin-left"
                style={{ background: `linear-gradient(to right, ${data.accentFrom}70, transparent)` }}
              />

              {/* Number */}
              <span className="font-mono text-[11px] tracking-[0.28em] text-white/20 transition-colors duration-300 group-hover:text-white/50 shrink-0">
                {step.num}
              </span>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-16">
                <h3
                  className={`text-2xl font-semibold tracking-tight transition-colors duration-300 md:text-3xl ${
                    hovered === i ? "text-white" : "text-white/72"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`max-w-lg text-sm leading-relaxed transition-colors duration-300 md:text-base ${
                    hovered === i ? "text-white/62" : "text-white/32"
                  }`}
                >
                  {step.body}
                </p>
              </div>

              {/* Arrow */}
              <motion.span
                animate={{ x: hovered === i ? 4 : 0, opacity: hovered === i ? 1 : 0.18 }}
                transition={{ duration: 0.28, ease }}
                className="hidden text-white/50 md:block shrink-0"
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

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FaqSection({ data }: { data: ServicePageData }) {
  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full blur-[140px]"
        style={{ background: data.accentTo + "0e" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            Questions, answered.
          </h2>
        </motion.div>

        <div className="border-t border-white/[0.08]">
          {data.faqs.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CtaSection({ data }: { data: ServicePageData }) {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-12">
      {/* Pulsing blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.16, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: data.accentFrom + "30" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.17, 0.10] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: data.accentTo + "28" }}
        />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel>Ready to start?</SectionLabel>

          <h2 className="mt-6 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
            {data.ctaHeadline[0]}
            <br />
            <span className="text-white/[0.16]">{data.ctaHeadline[1]}</span>
          </h2>

          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/38 md:text-lg">
            {data.ctaSub}
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
              className="text-[13px] text-white/28 underline underline-offset-4 decoration-white/10 transition-all hover:text-white/55 hover:decoration-white/28"
              data-cursor="View"
            >
              See our work first
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="mx-auto mt-20 h-px w-full max-w-xs origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/16"
        >
          40+ products shipped · 12+ years · No fluff
        </motion.p>
      </div>
    </section>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export function ServiceDetailClient({
  data,
  projects,
}: {
  data: ServicePageData;
  projects: ProjectItem[];
}) {
  return (
    <main className="bg-[#080808]">
      <ServiceHero data={data} />
      <WhySection data={data} />
      <CapabilitiesSection data={data} />
      <GrowthSection data={data} />
      <FeaturedWorkSection data={data} projects={projects} />
      <ProcessSection data={data} />
      <FaqSection data={data} />
      <CtaSection data={data} />
    </main>
  );
}
