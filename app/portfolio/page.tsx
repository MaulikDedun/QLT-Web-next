"use client";

import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projects } from "@/lib/site-data";

export default function PortfolioPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Portfolio</p>
        <h1 className="mt-4 text-5xl leading-[0.95] font-semibold md:text-7xl">Cinematic digital case studies.</h1>
      </section>
      <section className="mx-auto mt-14 max-w-6xl overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((item, index) => (
            <div key={item.slug} className="min-w-0 flex-[0_0_88%] pr-4 md:flex-[0_0_55%]">
              <motion.article
                className="rounded-3xl border border-black/10 bg-[var(--bg-secondary)] p-6"
                animate={{ opacity: active === index ? 1 : 0.55, scale: active === index ? 1 : 0.96 }}
                onMouseEnter={() => setExpanded(index)}
                onMouseLeave={() => setExpanded(null)}
                onClick={() => setExpanded((value) => (value === index ? null : index))}
                transition={{ duration: 0.45 }}
              >
                <div className="h-56 rounded-2xl bg-black/80 md:h-72" />
                <h2 className="mt-5 text-2xl">{item.title}</h2>
                <AnimatePresence initial={false}>
                  {expanded === index && active === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-4 border-t border-black/10 pt-4 text-sm text-[#6b6b6b]"
                    >
                      <p>{item.summary}</p>
                      <Link href={`/portfolio/${item.slug}`} className="text-hover-link mt-3 inline-block text-black">
                        View Case Study →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
