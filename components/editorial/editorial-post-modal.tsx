"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import type { EditorialPost } from "@/lib/site-data";

const ease = [0.76, 0, 0.24, 1] as const;

type Props = { post: EditorialPost | null; onClose: () => void };

export function EditorialPostModal({ post, onClose }: Props) {
  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#0d0d0d] text-white shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover */}
            <div className="relative h-56 w-full overflow-hidden md:h-64">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />

              {/* Top badges */}
              <div className="absolute left-5 top-5 flex items-center gap-2">
                <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/65 backdrop-blur-md">
                  {post.category}
                </span>
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/40 backdrop-blur-md">
                  {post.readTimeMinutes} min read
                </span>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white/60 backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto px-7 pb-8 pt-6 md:px-8">
              {/* Title */}
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/52">{post.excerpt}</p>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.07] pt-5 text-[12px] text-white/35">
                <span>
                  <span className="text-white/55">{post.author.name}</span>
                  {" · "}
                  {post.author.role}
                </span>
                <span>
                  {new Date(post.dateISO).toLocaleDateString(undefined, {
                    year: "numeric", month: "short", day: "2-digit",
                  })}
                </span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/38">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Paragraphs */}
              <div className="mt-7 space-y-5">
                {post.paragraphs.map((p, i) => (
                  <motion.p
                    key={`${post.id}-p-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease }}
                    className="text-[15px] leading-relaxed text-white/62"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
