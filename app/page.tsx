"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import StackIcon, { type IconName } from "tech-stack-icons";
import { HeroSection } from "@/components/hero/hero-section";
import { ServiceLottiePreview } from "@/components/effects/service-lottie-preview";
import { EditorialPostCard } from "@/components/editorial/editorial-post-card";
import { EditorialPostModal } from "@/components/editorial/editorial-post-modal";
import { FeaturedWorkCarousel } from "@/components/portfolio/featured-work-carousel";
import { projects, processSteps, insightPosts, type EditorialPost, services } from "@/lib/site-data";

const ease = [0.76, 0, 0.24, 1] as const;

const TECH_ROW_1: IconName[] = ["nextjs","react","typescript","nodejs","tailwindcss","vercel","github","graphql","docker","aws"];
const TECH_ROW_2: IconName[] = ["figma","framer","nextjs","react","typescript","tailwindcss","nodejs","vercel","github","graphql"];

export default function Home() {
  const [activeService, setActiveService] = useState(services[0]);
  const [activeStep, setActiveStep]       = useState(0);
  const [activePost, setActivePost]       = useState<EditorialPost | null>(null);

  return (
    <main className="bg-[#080808] pt-20">
      {/* ── Hero (untouched) ── */}
      <HeroSection />

      {/* ── Services ── */}
      <section className="relative overflow-hidden bg-[#080808] px-6 py-24 text-white md:px-12">
        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-20 top-0 h-[480px] w-[480px] rounded-full bg-violet-600/[0.08] blur-[140px]" />
          <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, ease }}
            className="mb-14">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Services</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              End-to-end product engineering,
              <br />
              <span className="text-white/[0.22]">designed as a proper system.</span>
            </h2>
          </motion.div>

          {/* Shell */}
          <div className="grid min-h-[64vh] w-full gap-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-6 md:grid-cols-[1.3fr_1fr] md:p-8">
            {/* Preview */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
              <ServiceLottiePreview
                serviceSlug={activeService.slug}
                service={activeService.title}
                note={activeService.note}
                previewImageUrl={activeService.previewImageUrl}
                previewGifUrl={activeService.previewGifUrl}
              />
            </div>

            {/* List */}
            <div className="flex flex-col">
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-white/28">Service Focus</p>
              <div className="space-y-3">
                {services.map((item, idx) => {
                  const active = activeService.slug === item.slug;
                  return (
                    <Link key={item.slug} href={`/services/${item.slug}`}
                      onClick={(e) => {
                        if (window.matchMedia("(max-width:767px)").matches && !active) {
                          e.preventDefault(); setActiveService(item);
                        }
                      }}
                      onMouseEnter={() => setActiveService(item)}
                      className={`group relative block overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                        active
                          ? "border-cyan-300/35 bg-gradient-to-r from-cyan-400/12 via-white/[0.07] to-violet-400/12 shadow-[0_8px_28px_rgba(6,182,212,0.10)]"
                          : "border-white/[0.10] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                      data-cursor="Explore" data-magnetic>
                      <div className={`absolute left-0 top-0 h-full w-[3px] rounded-r transition-colors duration-300 ${active ? "bg-cyan-300" : "bg-transparent group-hover:bg-white/25"}`} aria-hidden />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-[11px] tracking-[0.22em] ${active ? "text-cyan-200" : "text-white/28"}`}>0{idx+1}</span>
                          <motion.span animate={{ y: active ? -1 : 0 }} className="text-xl md:text-2xl font-medium">{item.title}</motion.span>
                        </div>
                        <motion.span animate={{ x: active ? 2 : 0 }}
                          className={`grid h-8 w-8 place-items-center rounded-full border text-sm transition-colors duration-300 ${active ? "border-cyan-200/50 bg-cyan-300/15 text-cyan-100" : "border-white/20 text-white/45"}`}>
                          →
                        </motion.span>
                      </div>
                      <p className={`mt-2.5 pl-9 text-sm transition-colors duration-300 ${active ? "text-white/75" : "text-white/42"}`}>{item.note}</p>
                    </Link>
                  );
                })}
              </div>
              <Link href="/services"
                className="btn-flip magnetic mt-8 w-full sm:w-fit"
                data-front="Explore services"
                data-back="See all →">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
        {/* Ghost text */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
          <div className="absolute left-[-3%] top-8 text-[clamp(80px,16vw,220px)] font-semibold leading-none tracking-[-0.06em] text-white/[0.04]">PROCESS</div>
          <div className="absolute right-[-2%] top-[40%] text-[clamp(60px,13vw,180px)] font-semibold leading-none tracking-[-0.06em] text-cyan-300/[0.05]">SYSTEM</div>
          <div className="absolute bottom-[-3%] left-[10%] text-[clamp(80px,18vw,240px)] font-semibold leading-none tracking-[-0.06em] text-violet-300/[0.04]">FLOW</div>
        </div>
        <div className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.07] blur-[140px]" aria-hidden />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/[0.07] blur-[140px]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_80px]" aria-hidden />

        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, ease }}
            className="max-w-3xl mb-20">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Process</p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              A structured system
              <br />
              <span className="text-white/[0.22]">for building modern products.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">
              Every project moves through a refined engineering and design workflow — reducing chaos, improving clarity, and accelerating delivery.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <div className="relative hidden lg:block">
              <div className="sticky top-28">
                <div className="absolute left-[17px] top-2 h-[82%] w-px bg-white/[0.08]" />
                <div className="space-y-8">
                  {processSteps.map((step, i) => {
                    const active = i === activeStep;
                    return (
                      <button key={step.title}
                        onMouseEnter={() => setActiveStep(i)}
                        onClick={() => setActiveStep(i)}
                        className="group relative flex w-full items-start gap-5 text-left">
                        <div className={`relative z-10 mt-1 h-9 w-9 shrink-0 rounded-full border transition-all duration-300 ${active ? "border-cyan-300 bg-cyan-300/20 shadow-[0_0_24px_rgba(34,211,238,0.30)]" : "border-white/12 bg-[#06070b]"}`}>
                          <div className={`absolute inset-[8px] rounded-full transition-colors ${active ? "bg-cyan-300" : "bg-white/18"}`} />
                        </div>
                        <div>
                          <p className={`font-mono text-[11px] tracking-[0.25em] transition-colors ${active ? "text-cyan-200" : "text-white/25"}`}>0{i+1}</p>
                          <h3 className={`mt-1.5 text-lg transition-colors ${active ? "text-white" : "text-white/45"}`}>{step.title}</h3>
                          <p className={`mt-1.5 max-w-[200px] text-sm leading-relaxed transition-colors ${active ? "text-white/58" : "text-white/28"}`}>{step.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Panel */}
            <div className="relative min-h-[680px]">
              <AnimatePresence mode="wait">
                <motion.div key={activeStep}
                  initial={{ opacity:0, y:28, filter:"blur(8px)" }}
                  animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                  exit={{ opacity:0, y:-18, filter:"blur(8px)" }}
                  transition={{ duration:0.5, ease }}
                  className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.025] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:p-12">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-[100px]" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-400/[0.08] blur-[100px]" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">Step 0{activeStep+1}</span>
                      <span className="h-px w-12 bg-gradient-to-r from-cyan-300/40 to-transparent" />
                    </div>
                    <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-tight">{processSteps[activeStep].title}</h3>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/52 md:text-lg">{processSteps[activeStep].description}</p>

                    <div className="my-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                    <div className="grid gap-3">
                      {processSteps[activeStep].bullets.map((bullet) => (
                        <motion.div key={bullet}
                          initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                          transition={{ duration:0.35 }}
                          className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all hover:border-cyan-300/20 hover:bg-white/[0.04]">
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10">
                            <div className="h-2 w-2 rounded-full bg-cyan-300" />
                          </div>
                          <p className="text-sm leading-relaxed text-white/58 md:text-[15px]">{bullet}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Step dots */}
                    <div className="mt-10 flex items-center gap-2">
                      {processSteps.map((_, i) => (
                        <button key={i} onClick={() => setActiveStep(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? "w-8 bg-cyan-300" : "w-1.5 bg-white/15 hover:bg-white/30"}`}
                          aria-label={`Step ${i+1}`} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-20 top-0 h-[480px] w-[480px] rounded-full bg-cyan-500/[0.08] blur-[140px]" />
          <div className="absolute -right-20 bottom-0 h-[480px] w-[480px] rounded-full bg-violet-500/[0.08] blur-[140px]" />
          {/* Tech icon constellation */}
          {([
            { name:"nextjs",     top:"5%",  left:"3%",  size:64, op:0.10, dur:28 },
            { name:"react",      top:"8%",  left:"18%", size:50, op:0.07, dur:22 },
            { name:"typescript", top:"4%",  left:"35%", size:58, op:0.09, dur:34 },
            { name:"vercel",     top:"6%",  left:"55%", size:62, op:0.09, dur:30 },
            { name:"figma",      top:"8%",  left:"72%", size:48, op:0.07, dur:24 },
            { name:"aws",        top:"5%",  left:"88%", size:56, op:0.08, dur:20 },
            { name:"docker",     top:"78%", left:"4%",  size:60, op:0.07, dur:32 },
            { name:"nodejs",     top:"76%", left:"20%", size:46, op:0.06, dur:24 },
            { name:"graphql",    top:"80%", left:"38%", size:54, op:0.07, dur:28 },
            { name:"github",     top:"77%", left:"58%", size:50, op:0.06, dur:22 },
            { name:"tailwindcss",top:"79%", left:"76%", size:58, op:0.08, dur:36 },
            { name:"nextjs",     top:"76%", left:"91%", size:52, op:0.07, dur:26 },
          ] as {name:IconName;top:string;left:string;size:number;op:number;dur:number}[]).map((ic,i) => (
            <div key={i} className="absolute" style={{ top:ic.top, left:ic.left, opacity:ic.op }}>
              <div style={{ animation:`rotate-slow ${ic.dur}s linear infinite`, width:ic.size, height:ic.size }}>
                <StackIcon name={ic.name} variant="light" style={{ width:ic.size, height:ic.size }} />
              </div>
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_72px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.65, ease }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Featured Work</p>
              <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
                Case studies,
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">built to last.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/45">
                Systems thinking, motion polish, and scalable engineering — in every project.
              </p>
            </div>
            <Link href="/portfolio" className="text-hover-link shrink-0 text-sm uppercase tracking-[0.15em] text-white/55" data-cursor="View">
              Explore All →
            </Link>
          </motion.div>
          <div className="my-10 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          <FeaturedWorkCarousel items={projects} />
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <section className="relative overflow-hidden bg-[#06070b] py-20 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#06070b_0%,transparent_12%,transparent_88%,#06070b_100%)] z-10" aria-hidden />
        <div className="mb-10 px-6 md:px-12">
          <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, ease }}
            className="text-[11px] uppercase tracking-[0.32em] text-white/25">
            Tools & Technologies
          </motion.p>
        </div>
        <div className="flex overflow-hidden mb-4">
          <motion.div className="flex shrink-0 items-center gap-10 pr-10"
            animate={{ x:["0%","-50%"] }} transition={{ duration:30, ease:"linear", repeat:Infinity }}>
            {[...TECH_ROW_1,...TECH_ROW_1].map((name,i) => (
              <div key={i} className="flex h-12 w-12 shrink-0 items-center justify-center opacity-25 hover:opacity-60 transition-opacity">
                <StackIcon name={name} style={{ width:36, height:36 }} />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex overflow-hidden">
          <motion.div className="flex shrink-0 items-center gap-10 pr-10"
            animate={{ x:["-50%","0%"] }} transition={{ duration:26, ease:"linear", repeat:Infinity }}>
            {[...TECH_ROW_2,...TECH_ROW_2].map((name,i) => (
              <div key={i} className="flex h-12 w-12 shrink-0 items-center justify-center opacity-18 hover:opacity-55 transition-opacity">
                <StackIcon name={name} style={{ width:36, height:36 }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white md:px-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.06] blur-[160px]" aria-hidden />

        <div className="relative mx-auto max-w-6xl">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.6, ease }}
            className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">Insights</p>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
                Editorial ideas,
                <br />
                <span className="text-white/[0.22]">made usable.</span>
              </h2>
            </div>
            <Link href="/insights" className="text-hover-link shrink-0 text-sm uppercase tracking-[0.15em] text-white/55" data-cursor="View">
              View All →
            </Link>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {insightPosts.slice(0,3).map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }} transition={{ duration:0.5, delay:i*0.07, ease }}>
                <EditorialPostCard post={post} onOpen={(p) => setActivePost(p)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}

      <EditorialPostModal post={activePost} onClose={() => setActivePost(null)} />
    </main>
  );
}
