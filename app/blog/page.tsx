"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["All", "Systems", "Motion", "Design", "Growth"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Blog</p>
        <h1 className="mt-4 text-5xl leading-[0.95] font-semibold md:text-7xl">Modern editorial product thinking.</h1>
      </section>
      <section className="sticky top-20 z-20 mx-auto mt-10 flex max-w-6xl gap-2 overflow-auto rounded-2xl border border-black/10 bg-white/80 p-2 backdrop-blur-xl">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-xl px-4 py-2 text-sm ${activeCategory === category ? "bg-black text-white" : "bg-transparent text-black/70"}`}
          >
            {category}
          </button>
        ))}
      </section>
      <section className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: item * 0.06 }}
            className="rounded-3xl border border-black/10 p-6"
          >
            <p className="text-sm text-[#6b6b6b]">Category</p>
            <h2 className="mt-4 text-2xl">Insight article #{item}</h2>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
