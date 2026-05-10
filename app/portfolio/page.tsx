"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { portfolioProjects, testimonials, type PortfolioProject } from "@/lib/site-data";

const ease = [0.76, 0, 0.24, 1] as const;

// ─── Filter config ────────────────────────────────────────────────────────────
const FILTERS = [
  { id: "all",              label: "All Work",       count: portfolioProjects.length },
  { id: "saas-development", label: "SaaS",           count: portfolioProjects.filter(p => p.service === "saas-development").length },
  { id: "ui-ux-design",     label: "UI / UX",        count: portfolioProjects.filter(p => p.service === "ui-ux-design").length },
  { id: "web-development",  label: "Web Dev",        count: portfolioProjects.filter(p => p.service === "web-development").length },
  { id: "growth-marketing", label: "Growth",         count: portfolioProjects.filter(p => p.service === "growth-marketing").length },
] as const;

type FilterId = typeof FILTERS[number]["id"];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function PortfolioHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[72svh] flex-col overflow-hidden bg-[#080808] text-white">
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
        aria-hidden
      />
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div animate={{ scale: [1,1.12,1], opacity:[0.12,0.20,0.12] }} transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
          className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[140px]" />
        <motion.div animate={{ scale: [1,1.08,1], opacity:[0.08,0.15,0.08] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:2.5 }}
          className="absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/14 blur-[120px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-32 pb-16 md:px-12">
        <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, ease, delay:0.1 }}
          className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/28">
          Selected Work · 2022 – 2025
        </motion.p>

        {/* Three-line headline — Refokus style */}
        {[
          { text: "Work that",   dim: false, delay: 0.16 },
          { text: "speaks",      dim: true,  delay: 0.26 },
          { text: "for itself.", dim: false, delay: 0.36 },
        ].map(({ text, dim, delay }) => (
          <div key={text} className="overflow-hidden">
            <motion.h1
              initial={{ y: "108%" }} animate={{ y: "0%" }}
              transition={{ duration: 1.0, ease, delay }}
              className={`text-[clamp(3.2rem,10.5vw,10rem)] font-semibold leading-[0.88] tracking-[-0.04em] ${dim ? "text-white/[0.13]" : "text-white"}`}
            >
              {text}
            </motion.h1>
          </div>
        ))}

        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease, delay:0.9 }}
          className="mt-10 max-w-[380px] text-[15px] leading-relaxed text-white/30">
          40+ products shipped across SaaS, UI/UX, web engineering, and growth — every one built to last.
        </motion.p>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}

// ─── Filter Bar — Refokus pill style ─────────────────────────────────────────
function FilterBar({ active, onChange }: { active: FilterId; onChange: (f: FilterId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: 0.1 }}
      className="flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Filter work by service"
    >
      {FILTERS.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            key={f.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(f.id)}
            className={`group relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium tracking-tight transition-all duration-300 ${
              isActive
                ? "border-white/30 bg-white text-[#080808]"
                : "border-white/[0.10] bg-white/[0.03] text-white/50 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
            }`}
          >
            {f.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono transition-colors duration-300 ${
              isActive ? "bg-black/10 text-[#080808]/60" : "bg-white/[0.06] text-white/30"
            }`}>
              {f.count}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

// ─── Project Card — Refokus list-row style ────────────────────────────────────
function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.48, delay: index * 0.055, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <Link href={`/portfolio/${project.slug}`} data-cursor="View" className="block">
        {/* Row divider */}
        <div className="absolute left-0 top-0 h-px w-full bg-white/[0.07]" />

        <div className="flex flex-col gap-6 py-8 transition-all duration-500 md:flex-row md:items-center md:gap-10 md:py-10">

          {/* Index */}
          <span className="hidden font-mono text-[11px] tracking-[0.25em] text-white/20 transition-colors duration-300 group-hover:text-white/40 md:block md:w-10 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Thumbnail — slides in on hover */}
          <div className="relative h-[200px] w-full overflow-hidden rounded-2xl md:h-[140px] md:w-[220px] shrink-0">
            <Image
              src={project.coverImageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 220px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            {/* Year badge */}
            <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
              {project.year}
            </span>
          </div>

          {/* Main content */}
          <div className="flex flex-1 flex-col gap-3 md:gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white/88 transition-colors duration-300 group-hover:text-white md:text-3xl">
                {project.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/58 md:text-base">
              {project.summary}
            </p>
            {/* Tags */}
            <div className="mt-1 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/38 transition-colors duration-300 group-hover:border-white/[0.14] group-hover:text-white/55">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.28, ease }}
            className="hidden shrink-0 md:flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60"
          >
            →
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Work List Section ────────────────────────────────────────────────────────
function WorkListSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filtered = activeFilter === "all"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.service === activeFilter);

  return (
    <section className="relative bg-[#080808] px-6 pb-28 text-white md:px-12">
      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-20 -mx-6 mb-10 border-b border-white/[0.06] bg-[#080808]/90 px-6 py-5 backdrop-blur-xl md:-mx-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Count line */}
        <motion.p
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-2 text-[11px] uppercase tracking-[0.28em] text-white/22"
        >
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </motion.p>

        {/* List */}
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>

        {/* Bottom rule */}
        <div className="mt-0 h-px w-full bg-white/[0.07]" />
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  return (
    <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
      {/* Ghost text */}
      <div className="pointer-events-none absolute -right-4 top-8 select-none text-[clamp(60px,14vw,180px)] font-semibold leading-none tracking-[-0.06em] text-white/[0.03]" aria-hidden>
        CLIENTS
      </div>

      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[160px]" aria-hidden />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, ease }}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Testimonials</p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              What clients say.
            </h2>
          </div>
          {/* Dot nav */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Quote card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.025] p-10 md:p-14"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.10),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.08),transparent_50%)]" />

            <div className="relative">
              {/* Large quote mark */}
              <div className="mb-8 text-[80px] leading-none text-white/[0.06] font-serif select-none" aria-hidden>&ldquo;</div>

              <blockquote className="text-xl leading-relaxed text-white/80 md:text-2xl md:leading-relaxed lg:text-3xl lg:leading-relaxed">
                {testimonials[active].quote}
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={testimonials[active].avatarUrl}
                    alt={testimonials[active].author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/88">{testimonials[active].author}</p>
                  <p className="text-[12px] text-white/38">{testimonials[active].role}, {testimonials[active].company}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setActive((v) => (v - 1 + total) % total)}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/50 transition-all hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
          >
            ←
          </button>
          <button
            onClick={() => setActive((v) => (v + 1) % total)}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/50 transition-all hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:text-cyan-100"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Book a Demo Section ──────────────────────────────────────────────────────
function BookDemoSection() {
  return (
    <section className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-12">
      {/* Pulsing blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div animate={{ scale:[1,1.15,1], opacity:[0.14,0.22,0.14] }} transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
          className="absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
        <motion.div animate={{ scale:[1,1.1,1], opacity:[0.10,0.17,0.10] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:3 }}
          className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[130px]" />
      </div>
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize:"200px 200px" }}
        aria-hidden />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.4 }} transition={{ duration:0.8, ease }}>
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/25">Ready to start?</p>

          <h2 className="mt-6 text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
            Let&apos;s build
            <br />
            <span className="text-white/[0.16]">something real.</span>
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
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/services" className="text-[13px] text-white/28 underline underline-offset-4 decoration-white/10 transition-all hover:text-white/55 hover:decoration-white/28" data-cursor="View">
              Explore our services
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:1.2, ease, delay:0.3 }}
          className="mx-auto mt-20 h-px w-full max-w-xs origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.5 }}
          className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/16">
          40+ products shipped · 12+ years · No fluff
        </motion.p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  return (
    <main className="bg-[#080808]">
      <PortfolioHero />
      <WorkListSection />
      <TestimonialsSection />
      <BookDemoSection />
    </main>
  );
}
