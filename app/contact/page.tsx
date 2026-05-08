"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-black/50">Contact</p>
        <h1 className="mt-4 text-4xl leading-tight md:text-6xl">Start a project</h1>
        <p className="mt-4 max-w-2xl text-base text-black/60 md:text-lg">
          Share a short brief and we’ll reply with next steps, timeline, and a practical plan.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_55px_rgba(11,18,32,0.08)] backdrop-blur-xl md:p-8">
            <h2 className="text-xl md:text-2xl">Email</h2>
            <p className="mt-2 text-sm text-black/60">Fastest way to reach us.</p>
            <a className="text-hover-link mt-5 inline-flex text-base font-medium" href="mailto:hello@quantatechlabs.com">
              hello@quantatechlabs.com
            </a>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_18px_55px_rgba(11,18,32,0.08)] backdrop-blur-xl md:p-8">
            <h2 className="text-xl md:text-2xl">What to include</h2>
            <ul className="mt-4 space-y-2 text-sm text-black/65">
              <li>• Product summary + goal</li>
              <li>• Timeline and constraints</li>
              <li>• Links (if any): Figma, docs, existing site</li>
              <li>• Target users / market</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

