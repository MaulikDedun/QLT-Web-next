"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { EditorialPost } from "@/lib/site-data";
import { insightPosts } from "@/lib/site-data";
import { EditorialPostCard } from "@/components/editorial/editorial-post-card";
import { EditorialPostModal } from "@/components/editorial/editorial-post-modal";

export default function InsightsPage() {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of insightPosts) set.add(p.category);
    return ["All", ...Array.from(set)];
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activePost, setActivePost] = useState<EditorialPost | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insightPosts.filter((p) => {
      const matchesCategory = activeCategory === "All" ? true : p.category === activeCategory;
      const matchesQuery = q.length === 0 ? true : (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">Insights</p>
        <h1 className="mt-4 text-5xl leading-[0.95] font-semibold md:text-7xl">Editorial ideas and deep dives.</h1>
        <p className="mt-4 max-w-2xl text-sm text-black/60">
          Short, actionable reads on system thinking, motion strategy, and building scalable frontend experiences.
        </p>
      </section>

      <section className="sticky top-20 z-20 mx-auto mt-10 flex max-w-6xl flex-col gap-3 rounded-2xl border border-black/10 bg-white/75 p-3 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-xl px-4 py-2 text-sm transition-colors ${
                activeCategory === category ? "bg-black text-white" : "bg-transparent text-black/70 hover:bg-black/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insights..."
            className="w-full rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm outline-none focus:border-black/20"
          />
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white/70 p-10 text-center">
            <p className="text-sm text-black/60">No results. Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.03 }}
              >
                <EditorialPostCard post={post} onOpen={(p) => setActivePost(p)} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <EditorialPostModal post={activePost} onClose={() => setActivePost(null)} />
    </main>
  );
}
