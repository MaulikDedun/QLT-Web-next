"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { blogPosts } from "@/lib/site-data";

const ease = [0.76, 0, 0.24, 1] as const;

const serviceItems = [
  { label: "SaaS Platforms",      description: "Connected product ecosystems & dashboards",   href: "/services/saas-development"  },
  { label: "UI / UX Systems",     description: "Design systems and motion-led interfaces",     href: "/services/ui-ux-design"      },
  { label: "Web Development",     description: "High-performance web experiences",             href: "/services/web-development"   },
  { label: "Growth & Marketing",  description: "Conversion loops, SEO, and scale strategy",   href: "/services/growth-marketing"  },
];

// ─── Dropdown wrapper ─────────────────────────────────────────────────────────
function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.22, ease }}
      className="absolute left-1/2 top-[calc(100%+10px)] z-50 -translate-x-1/2"
    >
      {/* arrow */}
      <div className="absolute -top-[5px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rotate-45 border-l border-t border-white/[0.08] bg-[#111111]" />
      {children}
    </motion.div>
  );
}

// ─── Services dropdown ────────────────────────────────────────────────────────
function ServicesDropdown() {
  return (
    <Dropdown>
      <div className="w-[720px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0e0e0e] shadow-[0_32px_80px_rgba(0,0,0,0.65)]">

        {/* decorative header band */}
        <div className="relative overflow-hidden border-b border-white/[0.06] px-7 py-6">
          {/* dot-grid texture */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:22px_22px]" />
          {/* soft orb */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">What we do</p>
              <p className="mt-1.5 text-[17px] font-semibold text-white/85">
                End-to-end product engineering
              </p>
            </div>
            {/* live badge */}
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white/55" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                Taking projects
              </span>
            </div>
          </div>
        </div>

        {/* service cards grid */}
        <div className="grid grid-cols-2 gap-px bg-white/[0.05] p-px">
          {serviceItems.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col gap-3 overflow-hidden bg-[#0e0e0e] p-7 transition-colors duration-200 hover:bg-white/[0.03]"
            >
              {/* index number — decorative */}
              <span className="absolute right-6 top-6 text-[12px] font-mono text-white/[0.10]">
                0{i + 1}
              </span>
              <div className="flex items-start justify-between gap-4">
                <span className="text-[16px] font-medium leading-snug text-white/80 transition-colors group-hover:text-white">
                  {s.label}
                </span>
                <span className="mt-0.5 shrink-0 text-[14px] text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/55">
                  →
                </span>
              </div>
              <span className="text-[13px] leading-relaxed text-white/40">
                {s.description}
              </span>
              {/* bottom accent line on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-white/20"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease }}
                style={{ originX: 0, width: "100%" }}
              />
            </Link>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-7 py-4">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/25">
            <span>Strategy</span>
            <span className="text-white/15">·</span>
            <span>Design</span>
            <span className="text-white/15">·</span>
            <span>Engineering</span>
          </div>
          <Link
            href="/services"
            className="text-[12px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white/75"
          >
            All services →
          </Link>
        </div>
      </div>
    </Dropdown>
  );
}

// ─── Insights dropdown ────────────────────────────────────────────────────────
function InsightsDropdown() {
  const posts = blogPosts.slice(0, 2);
  return (
    <Dropdown>
      <div className="w-[640px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0e0e0e] shadow-[0_32px_80px_rgba(0,0,0,0.65)]">

        {/* decorative header band */}
        <div className="relative overflow-hidden border-b border-white/[0.06] px-7 py-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:22px_22px]" />
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/[0.025] blur-3xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Editorial</p>
              <p className="mt-1.5 text-[17px] font-semibold text-white/85">
                Ideas on systems, interfaces &amp; craft
              </p>
            </div>
            <Link
              href="/insights"
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:bg-white/[0.07] hover:text-white/70"
            >
              View all
            </Link>
          </div>
        </div>

        {/* post cards */}
        <div className="grid grid-cols-2 gap-px bg-white/[0.05] p-px">
          {posts.map((post) => (
            <Link
              key={post.id}
              href="/blog"
              className="group relative flex flex-col overflow-hidden bg-[#0e0e0e] transition-colors duration-200 hover:bg-white/[0.03]"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="320px"
                  className="object-cover opacity-45 transition-all duration-500 group-hover:opacity-65 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/[0.10] bg-[#0e0e0e]/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/50 backdrop-blur-sm">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <p className="text-[15px] font-medium leading-snug text-white/75 transition-colors group-hover:text-white line-clamp-2">
                  {post.title}
                </p>
                <p className="text-[13px] leading-relaxed text-white/38 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-[12px] text-white/28">{post.readTimeMinutes} min read</span>
                  <span className="text-[13px] text-white/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/55">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-7 py-4">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-white/25">
            <span>Systems</span>
            <span className="text-white/15">·</span>
            <span>Motion</span>
            <span className="text-white/15">·</span>
            <span>Architecture</span>
          </div>
          <Link
            href="/insights"
            className="text-[12px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white/75"
          >
            All insights →
          </Link>
        </div>
      </div>
    </Dropdown>
  );
}

// ─── Main navbar ──────────────────────────────────────────────────────────────
export function FloatingNavbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [dropdown, setDropdown]         = useState<"services" | "insights" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(null); }, [pathname]);

  function openDrop(name: "services" | "insights") {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(name);
  }
  function schedulClose() {
    closeTimer.current = setTimeout(() => setDropdown(null), 120);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#080808]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-white transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-syne)" }}
          data-cursor="Home"
        >
          QuantaTechLabs
        </Link>

        {/* ── Desktop nav capsule ── */}
        <div className="hidden items-center md:flex">
          <div
            className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-1.5 py-1.5 backdrop-blur-md"
            onMouseLeave={schedulClose}
          >
            {/* Services */}
            <div className="relative" onMouseEnter={() => openDrop("services")}>
              <button
                type="button"
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                  dropdown === "services" || isActive("/services")
                    ? "bg-white/[0.08] text-white"
                    : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
                }`}
                data-cursor="Services"
              >
                Services
                <motion.svg
                  animate={{ rotate: dropdown === "services" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  className="opacity-40"
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>
              <AnimatePresence>
                {dropdown === "services" && (
                  <div onMouseEnter={() => openDrop("services")} onMouseLeave={schedulClose}>
                    <ServicesDropdown />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Work */}
            <Link
              href="/portfolio"
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                isActive("/portfolio")
                  ? "bg-white/[0.08] text-white"
                  : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
              }`}
              onMouseEnter={() => setDropdown(null)}
              data-cursor="Work"
            >
              Work
            </Link>

            {/* Insights */}
            <div className="relative" onMouseEnter={() => openDrop("insights")}>
              <button
                type="button"
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                  dropdown === "insights" || isActive("/insights") || isActive("/blog")
                    ? "bg-white/[0.08] text-white"
                    : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
                }`}
                data-cursor="Insights"
              >
                Insights
                <motion.svg
                  animate={{ rotate: dropdown === "insights" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  className="opacity-40"
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>
              <AnimatePresence>
                {dropdown === "insights" && (
                  <div onMouseEnter={() => openDrop("insights")} onMouseLeave={schedulClose}>
                    <InsightsDropdown />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <Link
              href="/about"
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                isActive("/about")
                  ? "bg-white/[0.08] text-white"
                  : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
              }`}
              onMouseEnter={() => setDropdown(null)}
              data-cursor="About"
            >
              About
            </Link>
          </div>
        </div>

        {/* ── Right: CTA + mobile toggle ── */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_24px_rgba(255,255,255,0.10)] md:inline-flex"
            data-cursor="Let's talk"
          >
            Start a project
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-white/[0.08] bg-white/[0.04] md:hidden"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease }}
              className="block h-px w-4 bg-white/70 origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-4 bg-white/70"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease }}
              className="block h-px w-4 bg-white/70 origin-center"
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#080808] md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {/* Services accordion */}
              <MobileAccordion label="Services">
                {serviceItems.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[13px] text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/80"
                  >
                    {s.label}
                    <span className="text-white/20">→</span>
                  </Link>
                ))}
              </MobileAccordion>

              <Link href="/portfolio" className="rounded-xl px-4 py-3 text-[15px] font-medium text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white">
                Work
              </Link>

              {/* Insights accordion */}
              <MobileAccordion label="Insights">
                <Link href="/insights" className="flex items-center justify-between rounded-xl px-4 py-3 text-[13px] text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/80">
                  All Insights <span className="text-white/20">→</span>
                </Link>
                <Link href="/blog" className="flex items-center justify-between rounded-xl px-4 py-3 text-[13px] text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/80">
                  Blog <span className="text-white/20">→</span>
                </Link>
              </MobileAccordion>

              <Link href="/about" className="rounded-xl px-4 py-3 text-[15px] font-medium text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white">
                About
              </Link>

              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-full bg-white py-3 text-[13px] font-semibold text-[#080808] transition-all hover:bg-white/88"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Mobile accordion ─────────────────────────────────────────────────────────
function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
      >
        {label}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="12" height="12" viewBox="0 0 10 10" fill="none"
          className="opacity-35"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden pl-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
