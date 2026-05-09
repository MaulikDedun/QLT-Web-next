"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Lottie from "lottie-react";
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

const createHeroSolverLottie = () => ({
  v: "5.7.6",
  fr: 60,
  ip: 0,
  op: 240,
  w: 500,
  h: 500,
  nm: "hero-solver",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "ring-1",
      sr: 1,
      ks: {
        o: { a: 0, k: 60 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 240, s: [360] }] },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [330, 330] }, nm: "Ellipse Path 1" },
            { ty: "st", c: { a: 0, k: [0.05, 0.05, 0.05, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2.4 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
          ],
          nm: "Ellipse 1",
        },
      ],
      ao: 0,
      ip: 0,
      op: 240,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "ring-2",
      sr: 1,
      ks: {
        o: { a: 0, k: 45 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 240, s: [-520] }] },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [270, 270] }, nm: "Ellipse Path 1" },
            { ty: "st", c: { a: 0, k: [0.05, 0.05, 0.05, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 1.8 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
          ],
          nm: "Ellipse 1",
        },
      ],
      ao: 0,
      ip: 0,
      op: 240,
      st: 0,
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "ring-3",
      sr: 1,
      ks: {
        o: { a: 0, k: 30 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 240, s: [780] }] },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [210, 210] }, nm: "Ellipse Path 1" },
            { ty: "st", c: { a: 0, k: [0.05, 0.05, 0.05, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 1.4 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
          ],
          nm: "Ellipse 1",
        },
      ],
      ao: 0,
      ip: 0,
      op: 240,
      st: 0,
    },
  ],
});

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState(services[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [activePost, setActivePost] = useState<EditorialPost | null>(null);
  const heroSolverLottie = useMemo(() => createHeroSolverLottie(), []);

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
      {/*hero*/}
      <section
        ref={heroRef}
        className="noise-overlay relative min-h-[95vh] overflow-hidden px-6 py-20 md:px-12"
      >
        <div className="pointer-events-none absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          >
            <source src="YOUR_VIDEO_LINK_HERE" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0814]/35 via-[#120f24]/72 to-[#070b14]/92" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(139,92,246,0.22),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.10),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.18),transparent_48%)]" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <AmbientCanvas />

        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute -right-10 top-6 hidden h-[520px] w-[520px] opacity-35 md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="h-full w-full"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.20),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(168,85,247,0.18),transparent_60%)] blur-2xl" />
              <div className="relative h-full w-full mix-blend-screen">
                <Lottie animationData={heroSolverLottie} loop />
              </div>
            </motion.div>
          </div>

          <div className="relative max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/65 shadow-[0_18px_55px_rgba(11,18,32,0.22)] backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" aria-hidden />
              We solve product chaos
            </motion.div>

            <SplitReveal
              text="From messy flows → crisp systems."
              className="hero-title mt-8 max-w-4xl text-6xl leading-[0.9] font-semibold tracking-tight text-white md:text-8xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-6 max-w-2xl text-xl text-white/70 md:text-2xl"
            >
              We design and build websites and SaaS products that feel effortless—because the system underneath is engineered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact"
                className="magnetic inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 text-base font-semibold tracking-tight text-white shadow-[0_18px_60px_rgba(76,29,149,0.35)] transition-transform hover:-translate-y-0.5"
                data-cursor="Open"
                data-magnetic
              >
                Start a Project
              </Link>
              <Link
                href="/portfolio"
                className="magnetic inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-8 py-4 text-base font-semibold tracking-tight text-white/85 shadow-[0_18px_55px_rgba(11,18,32,0.20)] backdrop-blur-xl transition-transform hover:-translate-y-0.5"
                data-cursor="View"
                data-magnetic
              >
                See proof
                <span className="ml-2 text-white/40" aria-hidden>→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                ["Audit", "Find the friction"],
                ["Design", "Systemize the UI"],
                ["Build", "Ship with motion"],
                ["Optimize", "Scale conversion"],
              ].map(([k, v], idx) => (
                <motion.div
                  key={k}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="group rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 shadow-[0_18px_55px_rgba(11,18,32,0.14)] backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white/60">
                      0{idx + 1}
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold tracking-tight text-white">{k}</p>
                      <p className="text-xs text-white/50">{v}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="p-36" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-48 w-full bg-gradient-to-t from-[#070a12] via-[#070a12]/90 to-transparent" />
      </section>
      {/*hero-ends*/}

      {/*services*/}
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#070a12] px-6 py-14 pb-26 text-white md:px-12">
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
                      onMouseEnter={() => setActiveService(item)}
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
                          <p className={`text-xs tracking-[0.2em] ${active ? "text-cyan-100" : "text-white/45"}`}>
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
      {/*services-ends*/}

      {/* process-redesign */}
<section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
  {/* background atmosphere */}
  {/* floating typography */}
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute left-[-4%] top-10 select-none text-[220px] font-semibold tracking-[-0.08em] text-white/[0.085] blur-[2px]">
    PROCESS
  </div>

  <div className="absolute right-[-2%] top-[38%] select-none text-[180px] font-semibold tracking-[-0.08em] text-cyan-300/[0.47]">
    SYSTEM
  </div>

  <div className="absolute bottom-[-4%] left-[12%] select-none text-[240px] font-semibold tracking-[-0.08em] text-violet-300/[0.125]">
    FLOW
  </div>
</div>
    <div className="absolute left-[-10%] top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[140px]" />
    <div className="absolute bottom-[-10%] right-[-5%] h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
    
  <div className="pointer-events-none absolute inset-0">
    
    
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_72px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]" />
  </div>

  <div className="relative mx-auto max-w-7xl">
    {/* header */}
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        Process
      </p>

      <h2 className="mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl">
        A structured system
        <br />
        for building modern products.
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
        Every project moves through a refined engineering and design workflow —
        reducing chaos, improving clarity, and accelerating delivery.
      </p>
    </div>

    {/* process layout */}
    <div className="mt-24 grid gap-16 lg:grid-cols-[320px_1fr]">
      {/* sticky sidebar */}
      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="absolute left-[17px] top-2 h-[82%] w-px bg-white/10" />

          <div className="space-y-10">
            {processSteps.map((step, index) => {
              const active = index === activeStep;

              return (
                <button
                  key={step.title}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className="group relative flex w-full items-start gap-5 text-left"
                >
                  {/* dot */}
                  <div
                    className={`relative z-10 mt-1 h-9 w-9 rounded-full border transition-all duration-300 ${
                      active
                        ? "border-cyan-300 bg-cyan-300/20 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                        : "border-white/15 bg-[#0c0f16]"
                    }`}
                  >
                    <div
                      className={`absolute inset-[8px] rounded-full transition-all ${
                        active ? "bg-cyan-300" : "bg-white/20"
                      }`}
                    />
                  </div>

                  {/* content */}
                  <div>
                    <p
                      className={`font-mono text-xs tracking-[0.25em] transition-colors ${
                        active ? "text-cyan-200" : "text-white/30"
                      }`}
                    >
                      0{index + 1}
                    </p>

                    <h3
                      className={`mt-2 text-lg transition-colors ${
                        active ? "text-white" : "text-white/50"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2 max-w-[220px] text-sm leading-relaxed transition-colors ${
                        active ? "text-white/65" : "text-white/35"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* active panel */}
      <div className="relative min-h-[720px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{
              duration: 0.55,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-12"
          >
            {/* ambient */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-400/10 blur-[120px]" />
            </div>

            {/* top */}
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
                    Step 0{activeStep + 1}
                  </span>

                  <span className="h-px w-16 bg-gradient-to-r from-cyan-300/50 to-transparent" />
                </div>

                <h3 className="mt-7 text-4xl leading-tight tracking-tight md:text-6xl">
                  {processSteps[activeStep].title}
                </h3>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
                  {processSteps[activeStep].description}
                </p>
              </div>

              {/* metric card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Outcome
                </p>

                <h4 className="mt-4 text-5xl font-semibold tracking-tight">
                  98%
                </h4>

                <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-white/50">
                  Faster alignment between strategy, interface systems, and
                  engineering execution.
                </p>
              </div>
            </div>

            {/* divider */}
            <div className="my-12 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

            {/* content grid */}
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              {/* bullets */}
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                  Key Deliverables
                </p>

                <div className="mt-8 grid gap-4">
                  {processSteps[activeStep].bullets.map((bullet) => (
                    <motion.div
                      key={bullet}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition-all hover:border-cyan-300/20 hover:bg-white/[0.045]"
                    >
                      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-300/10">
                        <div className="h-2 w-2 rounded-full bg-cyan-300" />
                      </div>

                      <p className="text-sm leading-relaxed text-white/65 md:text-[15px]">
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* visual preview */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1018] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_45%)]" />

                <div className="relative flex h-full min-h-[320px] flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                      Workflow Layer
                    </p>

                    <h4 className="mt-4 text-2xl leading-tight">
                      Systems engineered
                      <br />
                      for scale and clarity.
                    </h4>
                  </div>

                  {/* mock visual */}
                  <div className="relative mt-10">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="h-3 w-full rounded-full bg-white/10" />
                        <div className="h-3 w-[85%] rounded-full bg-cyan-300/20" />
                        <div className="h-3 w-[60%] rounded-full bg-white/10" />
                        <div className="h-24 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/10 to-violet-300/10" />
                      </div>
                    </div>
np
                    <div className="absolute -bottom-6 -right-6 rounded-2xl border border-white/10 bg-[#101522]/90 px-5 py-4 shadow-2xl backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                        Active Layer
                      </p>

                      <p className="mt-2 text-sm text-white/70">
                        {processSteps[activeStep].title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>
</section>
{/* process-redesign-ends */}

      {/* process → featured-work blend */}

      {/*featured-work*/}
      <section className="relative w-full overflow-hidden bg-[#070a12] px-6 pb-28 pt-36 text-white md:px-12">
        {/* ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute -right-20 bottom-0 h-[480px] w-[480px] rounded-full bg-violet-500/10 blur-[140px]" />
          {/* floating ghost typography */}
          <div className="absolute right-[-3%] top-8 select-none text-[200px] font-semibold leading-none tracking-[-0.08em] text-white/[0.04]">
            WORK
          </div>
          <div className="absolute bottom-[-2%] left-[8%] select-none text-[160px] font-semibold leading-none tracking-[-0.08em] text-cyan-300/[0.06]">
            CRAFT
          </div>
          {/* subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* header */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Featured Work</p>
              <h2 className="mt-5 text-5xl leading-[0.95] tracking-tight md:text-7xl">
                Case studies,
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                  built to last.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                Systems thinking, motion polish, and scalable engineering — in every project.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="text-hover-link shrink-0 text-sm uppercase tracking-[0.15em] text-white/70"
              data-cursor="View"
            >
              Explore All →
            </Link>
          </div>

          {/* divider */}
          <div className="my-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

          <FeaturedWorkCarousel items={projects} />
        </div>
      </section>
      {/*featured-work-ends*/}

      {/*tech-stack*/}
      <section className="bg-[#070a12] py-10 border-t border-white/[0.06]">
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
      {/*tech-stack-ends*/}

      {/*insights*/}
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
                          <span className="text-sm text-black/75 transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
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
                        <span className="rounded-full border border-black/10 bg-white/55 px-3 py-1 text-xs text-black/65">Product</span>
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
      {/*insights-ends*/}

      {/*ready-to-build*/}
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
      {/*ready-to-build-ends*/}

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