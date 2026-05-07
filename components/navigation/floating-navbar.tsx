"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function FloatingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 md:px-6 ${
          scrolled
            ? "border-black/10 bg-white/75 shadow-lg backdrop-blur-xl"
            : "border-black/5 bg-white/35 backdrop-blur-sm"
        } transition-all duration-500`}
      >
        <Link href="/" className="text-sm font-semibold tracking-wide" data-cursor="Home">
          QuantaTechLabs
        </Link>
        <div className="relative hidden items-center gap-6 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <Link
              href="/services"
              className={`text-sm transition-colors hover:text-black ${pathname.startsWith("/services") ? "text-black" : "text-black/75"}`}
            >
              Services
            </Link>
            <AnimatePresence>
              {showServices && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-0 top-7 w-52 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-xl"
                >
                  {[
                    ["SaaS Development", "/services/saas-development"],
                    ["Web Development", "/services/web-development"],
                    ["UI/UX Design", "/services/ui-ux-design"],
                    ["Growth & Marketing", "/services/growth-marketing"],
                  ].map(([label, href]) => (
                    <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm text-black/75 hover:bg-black/5 hover:text-black">
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-black ${pathname === item.href ? "text-black" : "text-black/75"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          className="magnetic rounded-full border border-black/15 px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase hover:-translate-y-0.5 hover:bg-black hover:text-white"
          data-cursor="Open"
          data-magnetic
        >
          Start a Project
        </Link>
      </nav>
    </header>
  );
}
