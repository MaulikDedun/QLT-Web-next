"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { EditorialPost } from "@/lib/site-data";
import { blogPosts } from "@/lib/site-data";
import { EditorialPostCard } from "@/components/editorial/editorial-post-card";
import { EditorialPostModal } from "@/components/editorial/editorial-post-modal";
import Link from "next/link";

const ease = [0.76, 0, 0.24, 1] as const;

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function BlogPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const categories = useMemo(() => Array.from(new Set(blogPosts.map((p) => p.category))), []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activePost, setActivePost] = useState<EditorialPost | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchQ = !q || (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [activeCategory, query]);

  return (
    <main className="bg-[#080808]">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex min-h-[72svh] flex-col overflow-hidden bg-[#080808] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.032]"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }} aria-hidden />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.20, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-violet-600/15 blur-[140px]" />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-32 pb-16 md:px-12">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/28">
            Blog · Product Thinking · Stories
          </motion.p>

          {[
            { text: "Modern product",  dim: false, delay: 0.16 },
            { text: "thinking,",       dim: true,  delay: 0.26 },
            { text: "made practical.", dim: false, delay: 0.36 },
          ].map(({ text, dim, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.h1 initial={{ y: "108%" }} animate={{ y: "0%" }}
                transition={{ duration: 1.0, ease, delay }}
                className={`text-[clamp(2.8rem,9vw,9rem)] font-semibold leading-[0.88] tracking-[-0.04em] ${dim ? "text-white/[0.13]" : "text-white"}`}>
                {text}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.9 }}
            className="mt-10 max-w-[380px] text-[15px] leading-relaxed text-white/30">
            Typography-led UX, motion systems, and growth loops — short stories that ship.
          </motion.p>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] to-transparent" />
      </section>

      {/* ── Filter + Grid ── */}
      <section className="relative bg-[#080808] px-6 pb-28 text-white md:px-12">
        <div className="sticky top-[72px] z-20 -mx-6 mb-12 border-b border-white/[0.06] bg-[#080808]/90 px-6 py-4 backdrop-blur-xl md:-mx-12 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-5 py-2 text-[13px] font-medium tracking-tight transition-all duration-300 ${
                      active
                        ? "border-white/30 bg-white text-[#080808]"
                        : "border-white/[0.10] bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/75"
                    }`}>
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-full border border-white/[0.10] bg-white/[0.04] px-5 py-2.5 text-[13px] text-white/70 placeholder-white/25 outline-none transition-colors focus:border-white/20 focus:bg-white/[0.06] md:w-64"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.p key={activeCategory + query} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-[11px] uppercase tracking-[0.28em] text-white/22">
            {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          </motion.p>

          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-[2rem] border border-white/[0.07] bg-white/[0.02] p-16 text-center">
              <p className="text-sm text-white/35">No results. Try a different category or search term.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => (
                  <motion.div key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease }}>
                    <EditorialPostCard post={post} onOpen={(p) => setActivePost(p)} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#06070b] px-6 py-28 text-white md:px-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[160px]" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease }}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/25">Work with us</p>
            <h2 className="mt-5 text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
              Read enough?
              <br />
              <span className="text-white/[0.18]">Let&apos;s build.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/38">
              We turn the thinking behind these posts into products that ship.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_40px_rgba(255,255,255,0.14)]"
                data-cursor="Open">
                Start a project
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="/insights" className="text-[13px] text-white/28 underline underline-offset-4 decoration-white/10 transition-all hover:text-white/55">
                Read insights instead
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <EditorialPostModal post={activePost} onClose={() => setActivePost(null)} />
    </main>
  );
}
