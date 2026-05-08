"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";
import { AmbientCanvas } from "@/components/effects/ambient-canvas";
import { ServiceLottiePreview } from "@/components/effects/service-lottie-preview";
import { SplitReveal } from "@/components/effects/split-reveal";
import { EditorialPostCard } from "@/components/editorial/editorial-post-card";
import { EditorialPostModal } from "@/components/editorial/editorial-post-modal";
import { FeaturedWorkCarousel } from "@/components/portfolio/featured-work-carousel";
import { FeaturedWorkBackdrop } from "@/components/effects/featured-work-backdrop";
import { projects, processSteps, insightPosts, type EditorialPost, services } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(services[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [activePost, setActivePost] = useState<EditorialPost | null>(null);

  useEffect(() => {
    const trigger = gsap.to(".hero-title", {
      yPercent: -24,
      opacity: 0.45,
      scale: 0.96,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, scrub: true, start: "top top", end: "bottom top" },
    });
    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((item) => item.kill());
    };
  }, []);

  const marquee = useMemo(
    () => ["Next.js", "TypeScript", "Framer Motion", "GSAP", "React", "Three.js", "Node", "WebGL"],
    [],
  );
  const techStackLogos = useMemo<IconName[]>(
    () => [
      "nextjs",
      "react",
      "typescript",
      "nodejs",
      "tailwindcss",
      "vercel",
      "github",
      "graphql",
      "docker",
      "aws",
    ],
    [],
  );
  const processDotTrack = useMemo(
    () => [
      { left: "8%", top: "-14px" },
      { left: "25%", top: "-9px" },
      { left: "42%", top: "-6px" },
      { left: "59%", top: "-8px" },
      { left: "76%", top: "-11px" },
      { left: "92%", top: "-13px" },
    ],
    [],
  );

  return (
    <main className="bg-white pt-20">
      <section ref={heroRef} className="noise-overlay relative min-h-[95vh] overflow-hidden px-6 py-20 md:px-12">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/25 via-transparent to-[#070a12]/18" />
        </div>
        <AmbientCanvas />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-xs tracking-[0.24em] uppercase text-[var(--text-secondary)]"
          >
            QuantaTechLabs - Cinematic Product Systems
          </motion.p>
          <SplitReveal
            text="Designing digital products that scale with cinematic precision."
            className="hero-title max-w-5xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-8xl"
          />
          <p className="max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl">
            Modern SaaS systems, immersive web experiences, and product ecosystems built for growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="btn-flip btn-flip-light magnetic w-full sm:w-auto"
              data-front="Start a project"
              data-back="Talk with us"
              data-cursor="Open"
              data-magnetic
            >
              Start a Project
            </button>
            <Link
              href="/portfolio"
              className="btn-flip magnetic w-full sm:w-auto"
              data-front="View work"
              data-back="Case studies"
              data-cursor="View"
              data-magnetic
            >
              View Work
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-black/10 bg-[var(--bg-secondary)] py-5">
        <motion.div
          className="flex gap-8 whitespace-nowrap text-sm uppercase tracking-[0.14em] text-black/70"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          {[...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </motion.div>
      </section>

      <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#070a12] px-6 py-14 text-white md:px-12">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-18"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/60 via-[#070a12]/75 to-[#070a12]/88" />
        </div>

        <div className="relative">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">Services</p>
            <h2 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
              End-to-end product engineering, designed as a proper system.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              Select a service to see the live visual preview and implementation direction.
            </p>
          </div>

          <div className="section-shell noise-overlay grid min-h-[68vh] w-full gap-10 p-6 text-white md:grid-cols-[1.25fr_1fr] md:p-10">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <ServiceLottiePreview
              serviceSlug={activeService.slug}
              service={activeService.title}
              note={activeService.note}
              previewImageUrl={activeService.previewImageUrl}
              previewGifUrl={activeService.previewGifUrl}
            />
            </div>
            <div className="relative flex flex-col">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/55">Service Focus</p>
              <div className="space-y-4">
                {services.map((item) => {
                  const active = activeService.slug === item.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      onClick={(event) => {
                        const isMobile = window.matchMedia("(max-width: 767px)").matches;
                        const isActive = activeService.slug === item.slug;
                        if (isMobile && !isActive) {
                          event.preventDefault();
                          setActiveService(item);
                        }
                      }}
                      onMouseEnter={() => {
                        setActiveService(item);
                      }}
                      className={`group relative block overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                        active
                          ? "border-cyan-300/40 bg-gradient-to-r from-cyan-400/15 via-white/10 to-purple-400/15 shadow-[0_10px_30px_rgba(6,182,212,0.12)]"
                          : "border-white/15 bg-white/4 hover:border-white/25 hover:bg-white/8"
                      }`}
                      data-cursor="Explore"
                      data-magnetic
                    >
                      <div
                        className={`absolute left-0 top-0 h-full w-1 rounded-r ${
                          active ? "bg-cyan-300" : "bg-transparent group-hover:bg-white/35"
                        }`}
                        aria-hidden
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <p
                            className={`text-xs tracking-[0.2em] ${
                              active ? "text-cyan-100" : "text-white/45"
                            }`}
                          >
                            0{services.findIndex((s) => s.slug === item.slug) + 1}
                          </p>
                          <motion.p
                            animate={{ y: active ? -2 : 0, opacity: active ? 1 : 0.86 }}
                            className="text-xl md:text-2xl"
                          >
                            {item.title}
                          </motion.p>
                        </div>
                        <motion.span
                          animate={{ x: active ? 2 : 0, scale: active ? 1.05 : 1 }}
                          className={`grid h-9 w-9 place-items-center rounded-full border text-sm ${
                            active ? "border-cyan-200/60 bg-cyan-300/20 text-cyan-100" : "border-white/30 text-white/60"
                          }`}
                        >
                          →
                        </motion.span>
                      </div>
                      <p className={`mt-3 pl-8 text-sm ${active ? "text-white/85" : "text-white/62"}`}>{item.note}</p>
                    </Link>
                  );
                })}
              </div>
              <button
                className="btn-flip magnetic mt-8 w-full sm:w-fit"
                data-front="Book a demo"
                data-back="Schedule call"
                onClick={() => setShowDemo(true)}
                data-magnetic
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[var(--bg-secondary)] px-6 py-16 md:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-20 bottom-6 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <h2 className="text-4xl leading-tight md:text-6xl">Process</h2>

          <div className="relative mt-8">
            <motion.div
              className="absolute h-8 w-8 -translate-x-1/2 rounded-full border border-white/115  bg-gradient-to-b from-[#070a12]/55 via-[#070a12]/78 to-[#070a12]/92 shadow-[0_10px_30px_rgba(6,182,212,0.16)]"
              animate={{ left: processDotTrack[activeStep].left, top: processDotTrack[activeStep].top }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.svg
              viewBox="0 0 2000 80"
              className="h-10 w-full overflow-visible"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <motion.path
                d="M0 40 Q 200 8, 400 40 T 800 40 T 2000 40"
                stroke="rgba(11,18,32,0.26)"
                strokeWidth="2"
                fill="none"
                variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              />
            </motion.svg>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-6">
            {processSteps.map((step, index) => {
              const active = index === activeStep;
              return (
                <button
                  key={step.title}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                    active
                      ? "border-black/20 bg-white/80 shadow-[0_6px_18px_rgba(11,18,32,0.08)]"
                      : "border-black/10 bg-white/40 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-gradient-to-r hover:from-cyan-400/18 hover:via-white/80 hover:to-purple-400/18 hover:shadow-[0_16px_34px_rgba(6,182,212,0.16)] hover:ring-1 hover:ring-cyan-400/25 focus-visible:border-cyan-400/45 focus-visible:ring-1 focus-visible:ring-cyan-400/25 focus-visible:shadow-[0_16px_34px_rgba(6,182,212,0.16)]"
                  }`}
                  data-cursor="Step"
                >
                  <p className="text-xs text-black/40">0{index + 1}</p>
                  <p className="mt-2 text-lg">{step.title}</p>
                  <p className="mt-2 text-xs text-black/55">{step.description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white/55 p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl md:text-2xl">{processSteps[activeStep].title}</h3>
              <button
                className="btn-flip btn-flip-light magnetic"
                data-front="Next step"
                data-back="Continue"
                data-cursor="Next"
                onClick={() => setActiveStep((v) => (v + 1) % processSteps.length)}
              >
                Next step
              </button>
            </div>
            <p className="mt-3 max-w-3xl text-sm text-black/65">{processSteps[activeStep].description}</p>
            <ul className="mt-4 grid gap-2 text-sm text-black/70 md:grid-cols-3">
              {processSteps[activeStep].bullets.map((b) => (
                <li key={b} className="rounded-xl border border-black/8 bg-white/60 px-3 py-2">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

     

      <section className="relative w-full overflow-hidden bg-[var(--bg-secondary)] px-6 py-20 md:px-12">
        <FeaturedWorkBackdrop />

        <div className="section-shell relative mx-auto max-w-6xl p-8 text-white md:p-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl md:text-5xl">Featured Work</h2>
              <p className="mt-3 max-w-xl text-sm text-white/70">
                A few cinematic case studies—built with systems thinking, motion polish, and scalable engineering.
              </p>
            </div>
            <Link href="/portfolio" className="text-hover-link text-sm uppercase tracking-[0.15em]" data-cursor="View">
              Explore All
            </Link>
          </div>

          <FeaturedWorkCarousel items={projects} />
        </div>
      </section>
      <section className=" bg-[var(--bg-secondary)] py-10">
        <div className="px-6 md:px-12">
          <div className="mx-auto flex w-full max-w-6xl flex-nowrap items-center justify-between gap-4">
            {techStackLogos.map((name) => (
              <div
                key={name}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 shadow-[0_10px_22px_rgba(11,18,32,0.08)] ring-1 ring-black/5 backdrop-blur md:h-14 md:w-14"
              >
                <div className="animate-[spin_30s_linear_infinite] opacity-90">
                  <StackIcon name={name} variant="light" className="stack-icon-clean h-9 w-9 md:h-8 md:w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-[var(--bg-secondary)]/55 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-14">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Insights</p>
              <h2 className="mt-3 text-4xl md:text-6xl">Editorial ideas, made usable</h2>
            </div>
            <Link href="/insights" className="text-hover-link text-sm uppercase tracking-[0.15em]" data-cursor="View">
              View All
            </Link>
          </div>

          {(() => {
            const [featured, secondary, tertiary] = insightPosts;
            const onOpen = (p: EditorialPost) => setActivePost(p);
            const categoryPills = Array.from(new Set(insightPosts.slice(0, 6).map((p) => p.category))).slice(0, 6);

            return (
              <div className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-12 md:auto-rows-[220px]">
                {featured && (
                  <motion.article
                    className="group relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-white/65 shadow-[0_18px_55px_rgba(11,18,32,0.10)] backdrop-blur-xl md:col-span-7 md:row-span-2"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => onOpen(featured)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onOpen(featured);
                    }}
                    aria-label={`Open post: ${featured.title}`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={featured.coverImageUrl}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
                    </div>

                    <div className="relative flex h-full flex-col justify-end p-7 md:p-9">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                        <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">{featured.category}</span>
                        <span className="text-white/65">{featured.readTimeMinutes} min read</span>
                      </div>
                      <h3 className="mt-4 max-w-xl text-4xl leading-tight text-white md:text-5xl">{featured.title}</h3>
                      <p className="mt-3 max-w-xl text-base text-white/70 md:text-lg">{featured.excerpt}</p>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/75">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-white/85 transition-transform group-hover:translate-x-0.5" aria-hidden>
                          Read →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                )}

                {secondary && (
                  <motion.article
                    className="group relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-gradient-to-br from-[#d7f3ee] via-white/80 to-[#e7e0ff] p-8 shadow-[0_18px_55px_rgba(11,18,32,0.08)] md:col-span-5 md:row-span-1 md:p-9"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    onClick={() => onOpen(secondary)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onOpen(secondary);
                    }}
                    aria-label={`Open post: ${secondary.title}`}
                  >
                    <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-300/35 blur-3xl" aria-hidden />
                    <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-purple-400/25 blur-3xl" aria-hidden />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between gap-3 text-xs text-black/60">
                        <span className="rounded-full bg-black/5 px-3 py-1">{secondary.category}</span>
                        <span>{secondary.readTimeMinutes} min read</span>
                      </div>

                      <div className="mt-5">
                        <h3 className="text-3xl leading-tight md:text-4xl">{secondary.title}</h3>
                        <p className="mt-3 text-base text-black/60">{secondary.excerpt}</p>
                      </div>

                      <div className="mt-7 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {secondary.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="rounded-full border border-black/10 bg-white/50 px-3 py-1 text-xs text-black/65">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-black/75 transition-transform group-hover:translate-x-0.5" aria-hidden>
                          →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                )}

                <motion.div
                  className="relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-white/70 p-8 shadow-[0_18px_55px_rgba(11,18,32,0.08)] backdrop-blur-xl md:col-span-5 md:row-span-1 md:p-9"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/45">Explore</p>
                      <h3 className="mt-2 text-2xl md:text-3xl">View all categories</h3>
                    </div>
                    <Link
                      href="/insights"
                      className="magnetic grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/80 text-lg"
                      data-cursor="View"
                      data-magnetic
                    >
                      →
                    </Link>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {categoryPills.map((pill) => (
                      <span key={pill} className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs text-black/65">
                        {pill}
                      </span>
                    ))}
                    {categoryPills.length === 0 && (
                      <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs text-black/65">
                        Product
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-base text-black/55">
                    Short reads on systems thinking, UX motion, architecture, and growth loops.
                  </p>
                </motion.div>
              </div>
              </div>
            );
          })()}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#070a12] px-6 py-20 text-white md:px-12 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.14),transparent_50%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/45 via-[#070a12]/78 to-[#070a12]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="section-shell noise-overlay mx-auto max-w-5xl rounded-[2.75rem] border border-white/10 bg-white/[0.03] px-6 py-14 text-center shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-14 md:py-18">
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Ready to Build</p>
            <SplitReveal text="Let's Build Something Exceptional." className="mt-6 text-4xl leading-[1.02] md:text-7xl" />
            <p className="mx-auto mt-5 max-w-2xl text-sm text-white/65 md:text-base">
              Tell us what you're building—we'll respond with a clear roadmap, timeline, and next steps.
            </p>
            <button
              className="btn-flip magnetic mt-10 w-full sm:w-auto"
              data-front="Start a project"
              data-back="Let's create"
              data-cursor="Open"
              data-magnetic
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showDemo && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-black/65 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-white/20 bg-[#161616]/90 p-8 text-white backdrop-blur-xl"
            >
              <h3 className="text-2xl">Book a Demo</h3>
              <p className="mt-3 text-white/65">Tell us about your product and we will send a tailored roadmap.</p>
              <button
                className="mt-8 rounded-full border border-white/40 px-5 py-2 text-sm"
                onClick={() => setShowDemo(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EditorialPostModal post={activePost} onClose={() => setActivePost(null)} />
    </main>
  );
}
