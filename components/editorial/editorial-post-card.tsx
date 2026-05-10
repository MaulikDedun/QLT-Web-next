"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { EditorialPost } from "@/lib/site-data";

type Props = { post: EditorialPost; onOpen: (post: EditorialPost) => void };

export function EditorialPostCard({ post, onOpen }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.04]"
      onClick={() => onOpen(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(post); }}
      aria-label={`Open post: ${post.title}`}
    >
      {/* Cover image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />

        {/* Category + read time */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/65 backdrop-blur-md">
            {post.category}
          </span>
        </div>
        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/40 backdrop-blur-md">
            {post.readTimeMinutes} min
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-white/88 transition-colors duration-300 group-hover:text-white md:text-2xl">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/42 transition-colors duration-300 group-hover:text-white/55">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/35">
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-white/30 transition-all duration-300 group-hover:text-white/60">
            Read
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: 2 }}
              className="inline-block"
              aria-hidden
            >
              →
            </motion.span>
          </span>
        </div>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400/60 via-violet-400/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}
