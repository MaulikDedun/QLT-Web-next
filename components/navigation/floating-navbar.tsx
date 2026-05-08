"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { blogPosts } from "@/lib/site-data";

const navItems = [
  { href: "/", label: "Home" as const },
  { href: "/portfolio", label: "Work" as const },
  { href: "/blog", label: "Insights" as const },
  { href: "/about", label: "About" as const },
];

const serviceItems = [
  {
    label: "SaaS",
    description: "Platforms, dashboards, and product systems",
    href: "/services/saas-development",
  },
  {
    label: "UI/UX",
    description: "Design systems and motion-led interfaces",
    href: "/services/ui-ux-design",
  },
  {
    label: "Web Development",
    description: "High-performance web experiences",
    href: "/services/web-development",
  },
  {
    label: "Marketing & SEO",
    description: "Growth loops, content, and conversion systems",
    href: "/services/growth-marketing",
  },
];

export function FloatingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "insights" | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      setMobileServicesOpen(false);
      setMobileInsightsOpen(false);
    }
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled ? "bg-white/82 backdrop-blur-xl" : "bg-white/55 backdrop-blur-md"
      }`}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-hover-link text-base font-semibold tracking-tight md:text-lg"
            data-cursor="Home"
            onMouseEnter={() => setHovered("logo")}
            onMouseLeave={() => setHovered(null)}
          >
            QuantaTechLabs
          </Link>

          <div className="relative hidden items-center md:flex">
            <div className="rounded-full border border-black/10 bg-white/70 p-1 shadow-[0_10px_30px_rgba(11,18,32,0.08)] backdrop-blur-xl">
              <div className="relative flex items-center gap-1">
                <AnimatePresence>
                  {hovered && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-y-0 rounded-full bg-black/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        left: 0,
                        width: 0,
                      }}
                    />
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onMouseEnter={() => {
                    setOpenDropdown("services");
                    setHovered("services");
                  }}
                  onFocus={() => setOpenDropdown("services")}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium tracking-tight transition-colors ${
                    openDropdown === "services" || pathname.startsWith("/services") ? "text-black" : "text-black/70"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === "services"}
                >
                  Services <span className="text-black/40">▾</span>
                </button>

                {navItems.map((item) => {
                  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => {
                        setOpenDropdown(null);
                        setHovered(item.href);
                      }}
                      onMouseLeave={() => setHovered(null)}
                      className={`relative rounded-full px-4 py-2 text-[15px] font-medium tracking-tight transition-colors ${
                        active ? "text-black" : "text-black/70 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onMouseEnter={() => {
                    setOpenDropdown("insights");
                    setHovered("insights");
                  }}
                  onFocus={() => setOpenDropdown("insights")}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium tracking-tight transition-colors ${
                    openDropdown === "insights" || pathname.startsWith("/blog") ? "text-black" : "text-black/70"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === "insights"}
                >
                  Insights <span className="text-black/40">▾</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/about" className="hidden rounded-full px-3 py-2 text-[15px] font-medium text-black/70 hover:text-black md:inline-flex">
            About
          </Link>
          <Link
            href="/contact"
            className="magnetic rounded-full bg-black px-5 py-3 text-[15px] font-semibold tracking-tight text-white shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-0.5"
            data-cursor="Open"
            data-magnetic
          >
            Start a Project
          </Link>

          <button
            type="button"
            className="magnetic inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/80 shadow-[0_12px_34px_rgba(11,18,32,0.10)] backdrop-blur md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-cursor="Menu"
            data-magnetic
          >
            <span aria-hidden className="text-lg leading-none">
              {mobileOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {openDropdown === "services" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.76, 0, 0.24, 1] }}
            className="hidden border-t border-black/10 bg-white/80 backdrop-blur-xl md:block"
          >
            <div className="mx-auto max-w-6xl px-12 py-7">
              <div className="flex items-start justify-between gap-10">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">Services</p>
                  <p className="mt-3 max-w-sm text-lg font-medium leading-snug text-black/80">
                    Modular capabilities—built like a system, shipped like a product.
                  </p>
                  <Link href="/services" className="mt-5 inline-flex text-sm font-medium text-black/70 hover:text-black">
                    View all services →
                  </Link>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-4">
                  {serviceItems.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="group rounded-3xl border border-black/10 bg-white/75 p-5 shadow-[0_14px_40px_rgba(11,18,32,0.08)] transition-all hover:-translate-y-1 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-lg font-semibold tracking-tight">{s.label}</p>
                        <span className="text-black/40 transition-transform group-hover:translate-x-0.5" aria-hidden>
                          →
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-black/60">{s.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openDropdown === "insights" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.76, 0, 0.24, 1] }}
            className="hidden border-t border-black/10 bg-white/80 backdrop-blur-xl md:block"
          >
            <div className="mx-auto max-w-6xl px-12 py-7">
              <div className="flex items-start justify-between gap-10">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">Insights</p>
                  <p className="mt-3 max-w-sm text-lg font-medium leading-snug text-black/80">
                    Editorial notes on systems, motion, and scalable engineering.
                  </p>
                  <Link href="/blog" className="mt-5 inline-flex text-sm font-medium text-black/70 hover:text-black">
                    View all posts →
                  </Link>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-4">
                  {blogPosts.slice(0, 2).map((post) => (
                    <Link
                      key={post.id}
                      href="/blog"
                      className="group overflow-hidden rounded-3xl border border-black/10 bg-white/75 shadow-[0_14px_40px_rgba(11,18,32,0.08)] transition-all hover:-translate-y-1 hover:bg-white"
                    >
                      <div className="relative h-28 w-full overflow-hidden">
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          sizes="320px"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3 text-xs text-black/55">
                          <span className="rounded-full bg-black/5 px-3 py-1">{post.category}</span>
                          <span>{post.readTimeMinutes} min read</span>
                        </div>
                        <p className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight">{post.title}</p>
                        <p className="mt-2 line-clamp-2 text-sm text-black/60">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="border-t border-black/10 bg-white/92 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto max-w-6xl px-6 py-6">
              <div className="flex flex-col gap-2">
                <Link href="/" className="rounded-2xl px-4 py-3 text-base font-semibold text-black/85">
                  Home
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-black/85"
                  aria-expanded={mobileServicesOpen}
                >
                  Services <span className="text-black/40">{mobileServicesOpen ? "–" : "+"}</span>
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-2 grid gap-2 px-2 pb-2">
                        <Link href="/services" className="rounded-2xl bg-black/5 px-4 py-3 text-sm text-black/75">
                          View all services
                        </Link>
                        {serviceItems.map((s) => (
                          <Link key={s.href} href={s.href} className="rounded-2xl bg-black/5 px-4 py-3 text-sm text-black/75">
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/portfolio" className="rounded-2xl px-4 py-3 text-base font-semibold text-black/85">
                  Work
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileInsightsOpen((v) => !v)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-black/85"
                  aria-expanded={mobileInsightsOpen}
                >
                  Insights <span className="text-black/40">{mobileInsightsOpen ? "–" : "+"}</span>
                </button>
                <AnimatePresence>
                  {mobileInsightsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-2 grid gap-2 px-2 pb-2">
                        <Link href="/blog" className="rounded-2xl bg-black/5 px-4 py-3 text-sm text-black/75">
                          View all posts
                        </Link>
                        {blogPosts.slice(0, 2).map((p) => (
                          <Link key={p.id} href="/blog" className="rounded-2xl bg-black/5 px-4 py-3 text-sm text-black/75">
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/about" className="rounded-2xl px-4 py-3 text-base font-semibold text-black/85">
                  About
                </Link>

                <div className="mt-2">
                  <Link href="/contact" className="block rounded-2xl bg-black px-4 py-4 text-center text-base font-semibold text-white">
                    Start a Project
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
