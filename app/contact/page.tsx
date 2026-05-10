"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;
const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const SERVICES = [
  "SaaS Development",
  "UI / UX Design",
  "Web Development",
  "Growth & Marketing",
  "Not sure yet",
];

const BUDGETS = [
  "< $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
];

type FormState = "idle" | "submitting" | "success" | "error";

// ─── Floating label input ─────────────────────────────────────────────────────
function Field({
  label, name, type = "text", required = false,
  value, onChange,
}: {
  label: string; name: string; type?: string; required?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-5 transition-all duration-200 ${
          active ? "top-2.5 text-[10px] uppercase tracking-[0.22em] text-white/35" : "top-1/2 -translate-y-1/2 text-[14px] text-white/35"
        }`}
      >
        {label}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-2xl border border-white/[0.10] bg-white/[0.04] pb-3.5 pl-5 pr-5 pt-7 text-[15px] text-white outline-none transition-all duration-200 focus:border-white/25 focus:bg-white/[0.06]"
        autoComplete="off"
      />
    </div>
  );
}

// ─── Floating label textarea ──────────────────────────────────────────────────
function TextareaField({
  label, name, required = false, value, onChange,
}: {
  label: string; name: string; required?: boolean;
  value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-5 transition-all duration-200 ${
          active ? "top-2.5 text-[10px] uppercase tracking-[0.22em] text-white/35" : "top-5 text-[14px] text-white/35"
        }`}
      >
        {label}{required && " *"}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full resize-none rounded-2xl border border-white/[0.10] bg-white/[0.04] pb-4 pl-5 pr-5 pt-8 text-[15px] text-white outline-none transition-all duration-200 focus:border-white/25 focus:bg-white/[0.06]"
      />
    </div>
  );
}

// ─── Pill selector ────────────────────────────────────────────────────────────
function PillSelector({
  label, options, selected, onToggle, multi = false,
}: {
  label: string; options: string[]; selected: string[];
  onToggle: (v: string) => void; multi?: boolean;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/30">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-all duration-250 ${
                active
                  ? "border-white/30 bg-white text-[#080808]"
                  : "border-white/[0.10] bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/75"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [company, setCompany]   = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget]     = useState<string[]>([]);
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState<FormState>("idle");

  function toggleService(v: string) {
    setServices((prev) =>
      prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]
    );
  }
  function toggleBudget(v: string) {
    setBudget((prev) => (prev.includes(v) ? [] : [v]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("submitting");
    // Simulate async submit — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
        className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-12 text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.12),transparent_55%)]" />
        <div className="relative">
          {/* Checkmark */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10">
            <motion.svg
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-cyan-300"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.25, ease }}
              />
            </motion.svg>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Message received.
          </h3>
          <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-white/45">
            We&apos;ll review your brief and get back to you within one business day.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setName(""); setEmail(""); setCompany("");
              setServices([]); setBudget([]); setMessage("");
            }}
            className="mt-8 text-[12px] uppercase tracking-[0.22em] text-white/30 transition-colors hover:text-white/60"
          >
            Send another →
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required value={name} onChange={setName} />
        <Field label="Email address" name="email" type="email" required value={email} onChange={setEmail} />
      </div>

      {/* Company */}
      <Field label="Company / project name" name="company" value={company} onChange={setCompany} />

      {/* Service selector */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
        <PillSelector
          label="What do you need?"
          options={SERVICES}
          selected={services}
          onToggle={toggleService}
          multi
        />
      </div>



      {/* Message */}
      <TextareaField
        label="Tell us about your project"
        name="message"
        required
        value={message}
        onChange={setMessage}
      />

      {/* Submit */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-[11px] text-white/22">
          * Required fields. We reply within 1 business day.
        </p>
        <button
          type="submit"
          disabled={status === "submitting" || !name || !email || !message}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold tracking-tight text-[#080808] transition-all duration-300 hover:bg-white/88 hover:shadow-[0_0_28px_rgba(255,255,255,0.14)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <AnimatePresence mode="wait">
            {status === "submitting" ? (
              <motion.span key="sending"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="block h-3.5 w-3.5 rounded-full border-2 border-[#080808]/30 border-t-[#080808]"
                />
                Sending…
              </motion.span>
            ) : (
              <motion.span key="send"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5">
                Send message
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#080808] text-white text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <main className="bg-[#080808]">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative flex min-h-[62svh] flex-col overflow-hidden bg-[#080808] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.032]"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }} aria-hidden />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div animate={{ scale:[1,1.12,1], opacity:[0.12,0.20,0.12] }}
            transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
            className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-violet-600/18 blur-[140px]" />
          <motion.div animate={{ scale:[1,1.08,1], opacity:[0.08,0.15,0.08] }}
            transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:2.5 }}
            className="absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/12 blur-[120px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOp }}
          className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-32 pb-16 md:px-12">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.55, ease, delay:0.1 }}
            className="mb-8 text-[11px] uppercase tracking-[0.32em] text-white/28">
            Start a project · Get in touch
          </motion.p>

          {[
            { text: "Let's build",     dim: false, delay: 0.16 },
            { text: "something",       dim: true,  delay: 0.26 },
            { text: "worth shipping.", dim: false, delay: 0.36 },
          ].map(({ text, dim, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.h1 initial={{ y:"108%" }} animate={{ y:"0%" }}
                transition={{ duration:1.0, ease, delay }}
                className={`text-[clamp(2.8rem,9vw,9rem)] font-semibold leading-[0.88] tracking-[-0.04em] ${dim ? "text-white/[0.13]" : "text-white"}`}>
                {text}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] to-transparent" />
      </section>

      {/* ── Main content ── */}
      <section className="relative bg-[#080808] px-6 pb-32 text-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">

            {/* Left — info panel */}
            <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.2 }} transition={{ duration:0.7, ease }}
              className="flex flex-col gap-10">

              {/* Intro */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/28">How it works</p>
                <p className="mt-5 text-lg leading-relaxed text-white/55 md:text-xl">
                  Share a short brief. We&apos;ll review it, ask the right questions, and come back with a clear plan — scope, timeline, and what it actually takes to ship.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-0 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                {[
                  { num:"01", title:"Fill the form", body:"Tell us about your project, what you need, and your rough budget." },
                  { num:"02", title:"We review",     body:"Within one business day we&apos;ll read your brief and prepare a response." },
                  { num:"03", title:"Discovery call", body:"A 30-minute call to align on goals, constraints, and next steps." },
                  { num:"04", title:"Proposal",      body:"A clear scope, timeline, and investment — no surprises." },
                ].map((step, i) => (
                  <motion.div key={step.num}
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.06, ease }}
                    className="flex gap-6 py-6">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-white/22 shrink-0 pt-0.5">{step.num}</span>
                    <div>
                      <p className="text-base font-semibold text-white/80">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/38"
                        dangerouslySetInnerHTML={{ __html: step.body }} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact details */}
              <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-7 space-y-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/28">Direct contact</p>
                <div className="space-y-3">
                  <a href="mailto:hello@quantatechlabs.com"
                    className="group flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white/85">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px]">✉</span>
                    hello@quantatechlabs.com
                    <span className="ml-auto text-white/20 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white/85">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px]">in</span>
                    LinkedIn
                    <span className="ml-auto text-white/20 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
                <div className="border-t border-white/[0.07] pt-5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300/50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300/70" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                      Currently taking new projects
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.2 }} transition={{ duration:0.7, ease, delay:0.1 }}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-8 md:p-10">
                {/* Inner glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.08),transparent_50%),radial-gradient(circle_at_20%_90%,rgba(6,182,212,0.06),transparent_50%)]" />
                <div className="relative">
                  <p className="mb-7 text-[11px] uppercase tracking-[0.32em] text-white/28">Project brief</p>
                  <ContactForm />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
