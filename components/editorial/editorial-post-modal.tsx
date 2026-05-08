"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import type { EditorialPost } from "@/lib/site-data";

type EditorialPostModalProps = {
  post: EditorialPost | null;
  onClose: () => void;
};

export function EditorialPostModal({ post, onClose }: EditorialPostModalProps) {
  useEffect(() => {
    if (!post) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-[95] grid place-items-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-[#0f0f0f]/90 text-white backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 w-full">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute left-6 top-6 flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{post.category}</span>
                <span className="text-xs text-white/70">{post.readTimeMinutes} min read</span>
              </div>
              <div className="absolute right-4 top-4">
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white/90 hover:bg-black/50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="px-6 pb-8 pt-6">
              <h2 className="text-3xl leading-tight">{post.title}</h2>
              <p className="mt-3 text-white/70">{post.excerpt}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-white/75">
                <span>
                  By <span className="font-medium text-white/90">{post.author.name}</span> · {post.author.role}
                </span>
                <span aria-hidden>·</span>
                <span>{new Date(post.dateISO).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 space-y-5 text-white/85">
                {post.paragraphs.map((p, idx) => (
                  <motion.p
                    key={`${post.id}-p-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className="leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

