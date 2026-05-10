"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.76, 0, 0.24, 1] as const;

const NAV = [
  {
    label: "Work",
    links: [
      { title: "Portfolio",        href: "/portfolio" },
      { title: "Case Studies",     href: "/portfolio" },
      { title: "Services",         href: "/services" },
    ],
  },
  {
    label: "Services",
    links: [
      { title: "SaaS Development", href: "/services/saas-development" },
      { title: "UI / UX Design",   href: "/services/ui-ux-design" },
      { title: "Web Development",  href: "/services/web-development" },
      { title: "Growth & Marketing", href: "/services/growth-marketing" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About",    href: "/about" },
      { title: "Insights", href: "/insights" },
      { title: "Blog",     href: "/blog" },
      { title: "Contact",  href: "/contact" },
    ],
  },
];

const SOCIALS = [
  { title: "GitHub",     href: "https://github.com/" },
  { title: "LinkedIn",   href: "https://linkedin.com/" },
  { title: "X (Twitter)", href: "https://x.com/" },
  { title: "Dribbble",   href: "https://dribbble.com/" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#06070b] text-white">
      {/* Top border gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-600/[0.07] blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">

        {/* ── Big CTA headline ── */}
        <div className="border-b border-white/[0.07] py-20 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/25">
                Ready to start?
              </p>
              <h2 className="mt-5 text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
                Let&apos;s build
                <br />
                <span className="text-white/[0.16]">something real.</span>
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease }}
              className="shrink-0"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_40px_rgba(255,255,255,0.14)]"
                data-cursor="Open"
                data-magnetic
              >
                Start a project
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Nav grid ── */}
        <div className="grid gap-12 border-b border-white/[0.07] py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-tight text-white/88 transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              QuantaTechLabs
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-white/38">
              A product engineering and design studio. We build digital products that are fast, coherent, and built to scale.
            </p>
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300/70" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/28">
                Taking new projects
              </span>
            </div>
            {/* Email */}
            <a
              href="mailto:hello@quantatechlabs.com"
              className="group inline-flex items-center gap-2 text-[13px] text-white/40 transition-colors hover:text-white/70"
            >
              hello@quantatechlabs.com
              <span className="text-white/20 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          {/* Nav columns */}
          {NAV.map((col) => (
            <div key={col.label} className="flex flex-col gap-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">{col.label}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 transition-colors duration-200 hover:text-white/80"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-[12px] text-white/25">
            © {year} QuantaTechLabs. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/30 transition-colors duration-200 hover:text-white/65"
              >
                {s.title}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="text-[12px] text-white/25 transition-colors hover:text-white/55">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="text-[12px] text-white/25 transition-colors hover:text-white/55">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
