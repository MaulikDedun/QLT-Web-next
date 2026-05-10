"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { CaseStudy } from "@/lib/site-data";

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Grain overlay ────────────────────────────────────────────────────────────
const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function CaseStudyHero({ study }: { study: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080808] text-white">
      {/* Parallax cover image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <Image
          src={study.coverImageUrl}
          alt={study.client}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }} aria-hidden />

      {/* Content */}
      <motion.div style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-6 pb-20 pt-32 md:px-12">

        {/* Back */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="absolute left-6 top-32 md:left-12">
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/30 transition-colors hover:text-white/60">
            ← Portfolio
          </Link>
        </motion.div>

        {/* Meta row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/55 backdrop-blur-sm">
            {study.service}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/35 backdrop-blur-sm">
            {study.year}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/35 backdrop-blur-sm">
            {study.duration}
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: "108%" }} animate={{ y: "0%" }}
            transition={{ duration: 1.0, ease, delay: 0.2 }}
            className="text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white">
            {study.client}
          </motion.h1>
        </div>

        {/* Role */}
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.85 }}
          className="mt-6 text-[13px] uppercase tracking-[0.28em] text-white/30">
          {study.role}
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}

// ─── Overview + Meta sidebar ──────────────────────────────────────────────────
function OverviewSection({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#080808] px-6 py-24 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
          {/* Overview text */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease }}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Overview</p>
            <p className="mt-6 text-xl leading-relaxed text-white/72 md:text-2xl md:leading-relaxed">
              {study.overview}
            </p>
          </motion.div>

          {/* Sidebar meta */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="flex flex-col gap-0 divide-y divide-white/[0.07] rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-8">
            {[
              { label: "Client",   value: study.client },
              { label: "Service",  value: study.service },
              { label: "Year",     value: study.year },
              { label: "Duration", value: study.duration },
              { label: "Role",     value: study.role },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1 py-5 first:pt-0 last:pb-0">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/28">{label}</span>
                <span className="text-sm text-white/72">{value}</span>
              </div>
            ))}
            <div className="pt-6">
              <Link href={`/services/${study.serviceSlug}`}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] transition-colors hover:text-white/80"
                style={{ color: study.accentColor }}>
                View service →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function GallerySection({ study }: { study: CaseStudy }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-24 text-white md:px-12">
      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: study.accentColor + "14" }} aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease }}
          className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/28">
          Project Gallery
        </motion.p>

        {/* Main image */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08]"
          style={{ aspectRatio: "16/9" }}>
          <Image
            src={study.galleryImages[active].url}
            alt={study.galleryImages[active].caption ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-all duration-700"
          />
          {study.galleryImages[active].caption && (
            <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
              {study.galleryImages[active].caption}
            </div>
          )}
        </motion.div>

        {/* Thumbnails */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {study.galleryImages.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${i === active ? "border-white/30" : "border-white/[0.07] opacity-50 hover:opacity-75"}`}
              style={{ aspectRatio: "16/9" }}>
              <Image src={img.url} alt={img.caption ?? ""} fill sizes="400px" className="object-cover" />
              {i === active && (
                <div className="absolute inset-0 rounded-xl"
                  style={{ boxShadow: `inset 0 0 0 1px ${study.accentColor}60` }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case Study Sections (Challenge / Approach / Solution) ───────────────────
function ContentSections({ study }: { study: CaseStudy }) {
  return (
    <section className="relative bg-[#080808] px-6 py-24 text-white md:px-12">
      {/* Horizontal rule atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl space-y-32">
        {study.sections.map((sec, i) => (
          <motion.div
            key={sec.label}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease }}
            className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20"
          >
            {/* Left label column */}
            <div className="flex flex-col gap-3 lg:pt-2">
              <span className="text-[11px] uppercase tracking-[0.32em] text-white/28">
                {sec.label}
              </span>
              {/* Accent number */}
              <span
                className="text-[80px] font-semibold leading-none tracking-[-0.06em] opacity-[0.06] select-none"
                aria-hidden
              >
                0{i + 1}
              </span>
            </div>

            {/* Right content */}
            <div>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
                {sec.heading}
              </h2>
              <div className="mt-8 space-y-5">
                {sec.body.map((para, pi) => (
                  <p key={pi} className="text-base leading-relaxed text-white/52 md:text-lg">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Results ──────────────────────────────────────────────────────────────────
function ResultsSection({ study }: { study: CaseStudy }) {
  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      {/* Animated ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
          style={{ background: study.accentColor + "22" }}
        />
      </div>

      {/* Ghost text */}
      <div
        className="pointer-events-none absolute -right-4 top-8 select-none text-[clamp(80px,16vw,220px)] font-semibold leading-none tracking-[-0.06em] opacity-[0.04]"
        aria-hidden
      >
        RESULTS
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Outcomes</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            The numbers
            <br />
            <span className="text-white/[0.18]">that matter.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {study.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-8 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              {/* Corner glow */}
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: study.accentColor + "50" }}
              />
              <p
                className="text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-none tracking-[-0.04em]"
                style={{ color: study.accentColor }}
              >
                {r.value}
              </p>
              <p className="mt-4 text-sm leading-snug text-white/55">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function TestimonialSection({ study }: { study: CaseStudy }) {
  if (!study.testimonial) return null;
  const t = study.testimonial;

  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: study.accentColor + "12" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.025] p-10 md:p-16"
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-[2.5rem]"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${study.accentColor}18, transparent 50%), radial-gradient(circle at 80% 80%, ${study.accentColor}0e, transparent 50%)`,
            }}
          />

          <div className="relative">
            {/* Quote mark */}
            <div className="mb-8 text-[80px] leading-none text-white/[0.06] font-serif select-none" aria-hidden>
              &ldquo;
            </div>

            <blockquote className="text-xl leading-relaxed text-white/78 md:text-2xl md:leading-relaxed lg:text-3xl lg:leading-relaxed">
              {t.quote}
            </blockquote>

            <div className="mt-10 flex items-center gap-4">
              {/* Accent dot */}
              <div
                className="h-10 w-10 shrink-0 rounded-full"
                style={{ background: `linear-gradient(135deg, ${study.accentColor}60, ${study.accentColor}20)`, border: `1px solid ${study.accentColor}30` }}
              />
              <div>
                <p className="text-sm font-medium text-white/88">{t.author}</p>
                <p className="text-[12px] text-white/38">{t.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Next Project ─────────────────────────────────────────────────────────────
function NextProjectSection({ next }: { next: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#06070b] text-white">
      <Link href={`/portfolio/${next.slug}`} data-cursor="View" className="group block">
        {/* Full-bleed image with parallax */}
        <div className="relative h-[60svh] overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
            <Image
              src={next.coverImageUrl}
              alt={next.client}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-[#06070b]/55 to-[#06070b]/20" />
          </motion.div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 md:px-12">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/30">Next Project</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white transition-opacity duration-300 group-hover:opacity-80">
                {next.client}
              </h2>
              <motion.div
                className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-xl text-white/60 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/[0.12] group-hover:text-white"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease }}
              >
                →
              </motion.div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/40 backdrop-blur-sm">
                {next.service}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/28 backdrop-blur-sm">
                {next.year}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection({ study }: { study: CaseStudy }) {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.20, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: study.accentColor + "30" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: study.accentColor + "20" }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/25">Start a project</p>

          <h2 className="mt-6 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
            Want results
            <br />
            <span className="text-white/[0.16]">like these?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/38 md:text-lg">
            Book a 30-minute call. We&apos;ll listen, ask the right questions, and tell you exactly how we can help.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_40px_rgba(255,255,255,0.14)]"
              data-cursor="Open" data-magnetic
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
              Back to all work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="mx-auto mt-20 h-px w-full max-w-xs origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
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
export function CaseStudyClient({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy | null;
}) {
  return (
    <main className="bg-[#080808]">
      <CaseStudyHero study={study} />
      <OverviewSection study={study} />
      <GallerySection study={study} />
      <ContentSections study={study} />
      <ResultsSection study={study} />
      <TestimonialSection study={study} />
      {next && <NextProjectSection next={next} />}
      <CtaSection study={study} />
    </main>
  );
}
