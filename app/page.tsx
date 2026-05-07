"use client";

import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AmbientCanvas } from "@/components/effects/ambient-canvas";
import { ServiceLottiePreview } from "@/components/effects/service-lottie-preview";
import { SplitReveal } from "@/components/effects/split-reveal";
import { projects, services } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const serviceLineRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [activeService, setActiveService] = useState(services[0]);
  const [activeProject, setActiveProject] = useState(0);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);

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

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveProject(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    const interval = setInterval(() => emblaApi.scrollNext(), 3200);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  const marquee = useMemo(
    () => ["Next.js", "TypeScript", "Framer Motion", "GSAP", "React", "Three.js", "Node", "WebGL"],
    [],
  );

  return (
    <main className="bg-white pt-20">
      <section ref={heroRef} className="noise-overlay relative min-h-[95vh] overflow-hidden px-6 py-20 md:px-12">
        <AmbientCanvas />
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-xs tracking-[0.24em] uppercase text-[#6b6b6b]"
          >
            QuantaTechLabs - Cinematic Product Systems
          </motion.p>
          <SplitReveal
            text="Designing digital products that scale with cinematic precision."
            className="hero-title max-w-5xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-8xl"
          />
          <p className="max-w-2xl text-lg text-[#6b6b6b] md:text-xl">
            Modern SaaS systems, immersive web experiences, and product ecosystems built for growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="magnetic rounded-full bg-black px-7 py-3 text-sm text-white"
              data-cursor="Open"
              data-magnetic
            >
              Start a Project
            </button>
            <Link
              href="/portfolio"
              className="magnetic rounded-full border border-black/20 px-7 py-3 text-sm"
              data-cursor="View"
              data-magnetic
            >
              View Work
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-black/10 bg-[#f3f3f3] py-5">
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

      <section className="px-6 py-20 md:px-12">
        <div className="section-shell noise-overlay mx-auto grid max-w-6xl gap-12 p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-14">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <ServiceLottiePreview
              serviceSlug={activeService.slug}
              service={activeService.title}
              note={activeService.note}
            />
          </div>
          <div className="relative space-y-4">
            <div ref={serviceLineRef} className="pointer-events-none absolute h-px w-0 bg-white/90" />
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
                  onMouseEnter={(event) => {
                    setActiveService(item);
                    const rect = event.currentTarget.getBoundingClientRect();
                    const parentRect = event.currentTarget.parentElement?.getBoundingClientRect();
                    const fromRight = event.clientX > rect.left + rect.width / 2;
                    if (!serviceLineRef.current) return;
                    gsap.set(serviceLineRef.current, {
                      x: rect.left - (parentRect?.left ?? 0),
                      y: rect.bottom - (parentRect?.top ?? 0) - 1,
                      width: 0,
                      transformOrigin: fromRight ? "right center" : "left center",
                    });
                    gsap.to(serviceLineRef.current, {
                      width: rect.width,
                      duration: 0.7,
                      ease: "power4.out",
                    });
                  }}
                  className="group block border-b border-white/20 pb-4"
                  data-cursor="Explore"
                  data-magnetic
                >
                  <div className="flex items-center justify-between">
                    <motion.p
                      animate={{ y: active ? -2 : 0, opacity: active ? 1 : 0.72 }}
                      className="text-xl md:text-2xl"
                    >
                      {item.title}
                    </motion.p>
                    <motion.span
                      animate={{ scale: active ? 1.12 : 1 }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/40 text-sm"
                    >
                      o
                    </motion.span>
                  </div>
                  <motion.div
                    animate={{ scaleX: active ? 1 : 0 }}
                    className="mt-3 h-px origin-left bg-white"
                  />
                </Link>
              );
            })}
            <button
              className="magnetic mt-6 rounded-full border border-white/40 px-6 py-3 text-sm"
              onClick={() => setShowDemo(true)}
              data-magnetic
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="section-shell mx-auto max-w-6xl p-8 text-white md:p-14">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-5xl">Featured Work</h2>
            <Link href="/portfolio" className="text-sm uppercase tracking-[0.15em]" data-cursor="View">
              Explore All
            </Link>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((item, index) => {
                const active = activeProject === index;
                const expanded = expandedProject === index;
                return (
                  <div key={item.slug} className="min-w-0 flex-[0_0_82%] pr-4 md:flex-[0_0_48%]">
                    <motion.button
                      onMouseEnter={() => setExpandedProject(index)}
                      onMouseLeave={() => setExpandedProject(null)}
                      onClick={() => setExpandedProject((v) => (v === index ? null : index))}
                      className={`w-full rounded-3xl border p-5 text-left md:p-6 ${
                        active ? "border-white/55 bg-white/10" : "border-white/20 bg-white/5"
                      }`}
                      animate={{ scale: active ? 1 : 0.94, opacity: active ? 1 : 0.6 }}
                      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                      data-cursor="Open"
                      data-magnetic
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">Case Study</p>
                      <p className="mt-3 text-xl">{item.title}</p>
                      <div className="mt-5 h-44 rounded-2xl bg-gradient-to-br from-white/20 to-white/0 md:h-52" />
                      <AnimatePresence initial={false}>
                        {expanded && active && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            className="mt-6 grid gap-5 border-t border-white/20 pt-5 md:grid-cols-2"
                          >
                            <div>
                              <p className="text-sm text-white/65">What We Did</p>
                              <ul className="mt-2 space-y-1 text-sm text-white/85">
                                <li>Product Design</li>
                                <li>Frontend Engineering</li>
                                <li>Motion Design</li>
                                <li>Development System</li>
                              </ul>
                            </div>
                            <div className="space-y-3">
                              <p className="text-sm text-white/75">
                                Modern SaaS experience built with cinematic interaction systems and scalable frontend architecture.
                              </p>
                              <Link
                                href={`/portfolio/${item.slug}`}
                                className="inline-block border-b border-white pb-1 text-sm"
                              >
                                Case Study →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <SplitReveal text="Process" className="text-3xl md:text-5xl" />
        <motion.svg
          viewBox="0 0 1200 80"
          className="mt-8 h-8 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.path
            d="M10 40 Q 200 10, 400 40 T 800 40 T 1190 40"
            stroke="rgba(17,17,17,0.35)"
            strokeWidth="2"
            fill="none"
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.svg>
        <div className="mt-8 grid gap-4 md:grid-cols-6">
          {["Discover", "Plan", "Design", "Build", "Launch", "Scale"].map((step, index) => (
            <div key={step} className="rounded-2xl border border-black/10 bg-[#f3f3f3] p-5">
              <p className="text-xs text-black/45">0{index + 1}</p>
              <p className="mt-2">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3 md:px-12">
        {["System Thinking in SaaS", "Motion as Product Strategy", "Scalable Frontend Architecture"].map((item) => (
          <article
            key={item}
            className="magnetic rounded-3xl border border-black/10 p-6 transition-transform hover:-translate-y-1"
            data-cursor="Read"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[#6b6b6b]">Insight</p>
            <h3 className="mt-3 text-2xl">{item}</h3>
          </article>
        ))}
      </section>

      <section className="noise-overlay bg-[#0d0d0d] px-6 py-20 text-white md:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">Ready to Build</p>
          <SplitReveal text="Let's Build Something Exceptional." className="mt-5 text-4xl leading-tight md:text-7xl" />
          <button
            className="magnetic mt-10 rounded-full border border-white/40 px-8 py-3 text-sm"
            data-cursor="Open"
            data-magnetic
          >
            Start a Project
          </button>
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
    </main>
  );
}
