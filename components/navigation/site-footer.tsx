"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#070a12] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.12),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.10),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <p className="text-sm font-semibold tracking-wide">QuantaTechLabs</p>
            <p className="max-w-sm text-sm text-white/65">
              Cinematic digital product and engineering studio. We design systems, ship fast, and keep experiences
              consistent as your product grows.
            </p>

            <div className="space-y-2 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Contact</p>
              <a className="text-hover-link inline-flex w-fit" href="mailto:hello@quantatechlabs.com">
                hello@quantatechlabs.com
              </a>
              <p className="text-white/55">India / Global</p>
            </div>
          </div>

          <div className="space-y-3 md:col-span-4 md:col-start-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">Social</p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                className="text-hover-link inline-flex w-fit text-white/70"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="text-hover-link inline-flex w-fit text-white/70"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-hover-link inline-flex w-fit text-white/70"
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} QuantaTechLabs. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link className="text-hover-link text-white/60" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="text-hover-link text-white/60" href="/terms-and-conditions">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

