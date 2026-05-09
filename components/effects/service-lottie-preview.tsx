"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type ServiceLottiePreviewProps = {
  serviceSlug: string;
  service: string;
  note: string;
  previewImageUrl: string;
  previewGifUrl: string;
};

const createLottie = (size: number, stroke: number, spin: number) => ({
  v: "5.7.6",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  nm: "service-orbit",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "ring",
      sr: 1,
      ks: {
        o: { a: 0, k: 90 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 180, s: [spin] }] },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [size, size] }, nm: "Ellipse Path 1" },
            { ty: "st", c: { a: 0, k: [0.95, 0.95, 0.95, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: stroke } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
          ],
          nm: "Ellipse 1",
        },
      ],
      ao: 0,
      ip: 0,
      op: 180,
      st: 0,
    },
  ],
});

const serviceAnimations: Record<string, unknown> = {
  "saas-development": createLottie(318, 2.8, 360),
  "ui-ux-design": createLottie(278, 2.2, -300),
  "web-development": createLottie(332, 1.8, 420),
  "growth-marketing": createLottie(294, 2.4, 540),
};

export function ServiceLottiePreview({ serviceSlug, service, note, previewImageUrl, previewGifUrl }: ServiceLottiePreviewProps) {
  const animationData = serviceAnimations[serviceSlug] ?? serviceAnimations["saas-development"];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service}
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">Live Preview</p>
        <h3 className="mt-3 text-2xl leading-tight md:text-3xl">{service}</h3>
        <p className="mt-2 max-w-xl text-sm text-white/65">{note}</p>
        <div className="relative mt-7 h-112 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
          {/* GIF only — full bleed */}
          <Image
            src={previewGifUrl}
            alt={`${service} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover opacity-80"
            unoptimized
          />
          {/* subtle dark vignette so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* bottom label */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">Live Preview</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/30">{note}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
