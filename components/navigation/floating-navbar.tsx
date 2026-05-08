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
  className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
    scrolled
      ? "border-b border-white/8 bg-[#0f1020]/46 backdrop-blur-2xl"
      : "bg-[#121325]/26 backdrop-blur-xl"
  }`}
  onMouseLeave={() => setOpenDropdown(null)}
>
  <div className="absolute inset-x-0 bottom-0 h-px bg-white/8" />

  <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5.5 md:px-12">
    
    <div className="flex items-center gap-14">

      {/* Logo */}
      <Link
        href="/"
        className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-base font-semibold tracking-tight text-transparent md:text-lg"
        data-cursor="Home"
        onMouseEnter={() => setHovered("logo")}
        onMouseLeave={() => setHovered(null)}
      >
        QuantaTechLabs
      </Link>

      {/* Desktop Nav */}
      <div className="relative hidden items-center md:flex">
        <div className="rounded-full border border-white/8 bg-[#17182b]/55 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-2xl">

          <div className="relative flex items-center gap-0.5">

            <AnimatePresence>
              {hovered && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-y-0 rounded-full bg-[#1e2035]/75 backdrop-blur-md"
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

            {/* Services */}
            <button
              type="button"
              onMouseEnter={() => {
                setOpenDropdown("services");
                setHovered("services");
              }}
              onFocus={() => setOpenDropdown("services")}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors ${
                openDropdown === "services" || pathname.startsWith("/services")
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>Services</span>

<motion.span
  animate={{ rotate: openDropdown === "services" ? 180 : 0 }}
  transition={{ duration: 0.2 }}
  className="text-[10px] text-white/30"
>
  ▼
</motion.span>
            </button>

            {/* Nav Items */}
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => {
                    setOpenDropdown(null);
                    setHovered(item.href);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors ${
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Insights */}
            <button
              type="button"
              onMouseEnter={() => {
                setOpenDropdown("insights");
                setHovered("insights");
              }}
              onFocus={() => setOpenDropdown("insights")}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors ${
                openDropdown === "insights" || pathname.startsWith("/blog")
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>Insights</span>

<motion.span
  animate={{ rotate: openDropdown === "insights" ? 180 : 0 }}
  transition={{ duration: 0.2 }}
  className="text-[10px] text-white/30"
>
  ▼
</motion.span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

      <Link
        href="/about"
        className="hidden rounded-full px-3 py-2 text-[15px] font-medium text-white/60 transition-colors hover:text-white md:inline-flex"
      >
        About
      </Link>

      <Link
        href="/contact"
        className="magnetic rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-[15px] font-semibold tracking-tight text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
        data-cursor="Open"
        data-magnetic
      >
        Start a Project
      </Link>

      {/* Mobile Button */}
      <button
        type="button"
        className="magnetic inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2d3048]/55 bg-[#1b1d33]/60 text-white/80 shadow-[0_12px_34px_rgba(0,0,0,0.16)] backdrop-blur md:hidden"
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

  {/* Services Dropdown */}
  <AnimatePresence>
    {openDropdown === "services" && (
      <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.76, 0, 0.24, 1] }}
      className="relative -mt-2 hidden overflow-hidden border border-white/[0.08] bg-[rgba(16,18,35,0.58)] backdrop-blur-[24px] supports-[backdrop-filter]:bg-[rgba(16,18,35,0.42)] md:block"
    >
      {/* Ambient cinematic tint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.06),transparent_34%)]" />
    
      {/* Glass reflection */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_22%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.05),transparent_35%)]" />
        
        <div className="mx-auto max-w-[1380px] px-12 py-8">

          <div className="grid grid-cols-[320px_1fr] gap-8">

            {/* Left Panel */}
            <div className="relative overflow-hidden rounded-none border border-white/8 bg-gradient-to-br from-[#1a1b31] via-[#141629] to-[#10111d] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

              <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_30%,white,transparent_30%)]" />

              <div className="absolute right-10 top-10 h-24 w-24 rounded-full border border-white/6" />

              <div className="absolute bottom-12 right-20 h-10 w-10 rounded-full border border-white/5" />

              <div className="relative z-10">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-white/40" />

                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                    Product Systems
                  </span>
                </div>

                <h3 className="mt-8 max-w-xs text-2xl font-semibold leading-tight tracking-tight text-white">
                  Designed with clarity. Built with precision.
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
                  We create scalable digital products with refined interaction,
                  structured systems, and modern engineering standards.
                </p>

                <div className="mt-8 flex items-center gap-4">

                  <Link
                    href="/services"
                    className="inline-flex items-center rounded-full border border-white/10 bg-[#1b1d33]/60 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.06]"
                  >
                    Explore services
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-white/35">
                    <span>Strategy</span>
                    <span>•</span>
                    <span>Design</span>
                    <span>•</span>
                    <span>Engineering</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Service Cards */}
            <div className="grid grid-cols-2 gap-4">
              {serviceItems.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group relative overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.02] p-5 shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.03]"
                >
                  <div className="relative z-10">

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold tracking-tight text-white">
                        {s.label}
                      </p>

                      <span className="text-white/25 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-white/45">
                      {s.description}
                    </p>
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
  {openDropdown === "insights" && (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: [0.76, 0, 0.24, 1] }}
    className="relative -mt-2 hidden overflow-hidden border border-white/[0.08] bg-[rgba(16,18,35,0.58)] backdrop-blur-[24px] supports-[backdrop-filter]:bg-[rgba(16,18,35,0.42)] md:block"
  >
    {/* Ambient cinematic tint */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.06),transparent_34%)]" />
  
    {/* Glass reflection */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_22%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.05),transparent_35%)]" />
      
      <div className="mx-auto max-w-[1380px] px-12 py-8">

        <div className="grid grid-cols-[320px_1fr] gap-8">

          {/* Left Panel */}
          <div className="rounded-none border border-white/8 bg-gradient-to-br from-[#1a1b31] via-[#141629] to-[#10111d] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#17182b]/55 px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-white/40" />

              <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                Editorial
              </span>
            </div>

            <h3 className="mt-8 max-w-xs text-2xl font-semibold leading-tight tracking-tight text-white">
              Notes on systems, interfaces, and digital engineering.
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Insights around scalable products, motion systems,
              interface design, and modern web architecture.
            </p>

            <Link
              href="/blog"
              className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-[#1b1d33]/60 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/[0.06]"
            >
              View all posts
            </Link>
          </div>

          {/* Posts */}
          <div className="grid grid-cols-2 gap-4">
            {blogPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href="/blog"
                className="group overflow-hidden rounded-[26px] border border-white/8 bg-[#17182b]/55 shadow-[0_12px_34px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.03]"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                <div className="p-5">

                  <div className="flex items-center justify-between text-xs text-white/35">
                    <span>{post.category}</span>
                    <span>{post.readTimeMinutes} min</span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-white">
                    {post.title}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  );
}
