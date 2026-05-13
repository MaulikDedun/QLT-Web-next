export type ServiceItem = {
  title: string;
  slug: string;
  note: string;
  previewImageUrl: string;
  previewGifUrl: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  bullets: string[];
};

export type EditorialAuthor = {
  name: string;
  role: string;
};

export type EditorialPost = {
  id: string;
  type: "insight" | "blog";
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  readTimeMinutes: number;
  dateISO: string;
  author: EditorialAuthor;
  tags: string[];
  paragraphs: string[];
};

export type ProjectItem = {
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string;
  highlights: string[];
};

export const services: ServiceItem[] = [
  {
    title: "SaaS Platforms",
    slug: "saas-development",
    note: "Connected product ecosystems",
    previewImageUrl:
      "qtl-next/public/img-load-err.webp",
    previewGifUrl: "/quanta_uiux_clean.gif",
 },
  {
    title: "UI/UX Systems",
    slug: "ui-ux-design",
    note: "Human-centered digital interface systems",
    previewImageUrl:
      "/img-load-err.webp",
    previewGifUrl: "/quanta_uiux_clean.gif",
    },
  {
    title: "Web Development",
    slug: "web-development",
    note: "High-performance engineering architecture",
    previewImageUrl:
      "/img-load-err.webp",
    previewGifUrl: "/webdev_short_title.gif",
    },
  {
    title: "Growth & Optimization",
    slug: "growth-marketing",
    note: "Experimentation and scale loops",
    previewImageUrl:
      "/img-load-err.webp",
    previewGifUrl: "/marketing_growth_clean_retry.gif",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Axiom Finance Platform",
    slug: "axiom-finance-platform",
    summary: "Cinematic B2B finance workspace for modern teams.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Design system for complex dashboards", "Motion-first UI choreography", "Secure workflow automation"],
  },
  {
    title: "Nexora Health Dashboard",
    slug: "nexora-health-dashboard",
    summary: "Unified clinical operations dashboard with premium UX systems.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Accessibility-led UX", "Fast data visualization patterns", "Operational clarity at a glance"],
  },
  {
    title: "Velocity Commerce Suite",
    slug: "velocity-commerce-suite",
    summary: "Conversion-driven commerce platform with modular frontend architecture.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Component-driven storefront UX", "Performance budget discipline", "Scalable experimentation loop"],
  },
  {
    title: "Helix AI Workspace",
    slug: "helix-ai-workspace",
    summary: "AI-assisted productivity environment with advanced motion interactions.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1600&auto=format&fit=crop",
    highlights: ["AI-assisted flows with guardrails", "Micro-interaction polish", "Scalable frontend architecture"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description: "We understand your goals, define the right direction, and create a clear roadmap for the product.",
    bullets: ["Business goals & planning","User needs & research","Project scope & strategy"],
  },
  {
    title: "Plan",
    description: "Design the system before we build the screens.",
    bullets: ["Information architecture", "UI/UX + motion direction", "Technical approach and constraints"],
  },
  {
    title: "Design",
    description: "Craft editorial-grade interfaces with component consistency.",
    bullets: ["Design system foundations", "Prototypes with real content", "Interaction choreography + states"],
  },
  {
    title: "Build",
    description: "Ship performant frontend foundations and reliable product logic.",
    bullets: ["Fast and scalable architecture", "Reliable product systems", "Optimized user experience"],
  },
  {
    title: "Launch",
    description: "Deploy with confidence and make onboarding feel effortless.",
    bullets: ["Release planning and rollbacks", "Analytics instrumentation", "Docs and handoff playbooks"],
  },
  {
    title: "Scale",
    description: "Evolve the product with iteration loops that compound.",
    bullets: ["Continuous improvements", "Product expansion & scaling", "Test, learn & optimization"],
  },
];

export const editorialPosts: EditorialPost[] = [
  {
    id: "ins-axiom-system-thinking",
    type: "insight",
    slug: "system-thinking-in-saas",
    category: "Systems",
    title: "System Thinking in SaaS: Build the loop, not the screen",
    excerpt: "A practical way to design product experiences that stay consistent while teams and complexity grow.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop",
    readTimeMinutes: 7,
    dateISO: "2026-04-21",
    author: { name: "Riya Mehta", role: "Product Engineering" },
    tags: ["design systems", "product strategy", "saas"],
    paragraphs: [
      "Most teams ship UI. High-performing teams ship systems. The difference shows up in how quickly new features become predictable, how smoothly teams collaborate, and how consistently the product behaves under stress.",
      "System thinking starts by separating what the user experiences from what the team maintains. You can create stability by designing boundaries: states, events, and data contracts that don't change every sprint.",
      "When the loop is clear, interactions can scale. Instead of reinventing the same patterns in new pages, you expand the system with components that already understand the product's language.",
    ],
  },
  {
    id: "ins-motion-as-product",
    type: "insight",
    slug: "motion-as-product-strategy",
    category: "Motion",
    title: "Motion as Product Strategy: Use transitions to explain",
    excerpt: "Motion isn't decoration. It's a communication layer that reduces cognitive load and improves perceived speed.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    readTimeMinutes: 6,
    dateISO: "2026-04-07",
    author: { name: "Kabir Shah", role: "Interaction Designer" },
    tags: ["framer motion", "ux", "performance"],
    paragraphs: [
      "The best motion systems behave like documentation: they show direction, intent, and cause. When animations reveal state changes, users don't have to guess what happened.",
      "Design motion with constraints: duration ranges, easing curves, and repeatable patterns. This is how you keep experiences consistent without slowing teams down.",
      "Finally, motion should respect performance budgets. Smoothness is a feature, so measure it, then tune it until it feels effortless.",
    ],
  },
  {
    id: "ins-scalable-frontend",
    type: "insight",
    slug: "scalable-frontend-architecture",
    category: "Growth",
    title: "Scalable Frontend Architecture: Ship faster by limiting change",
    excerpt: "Architecture is how you protect velocity. A few targeted patterns can reduce churn and keep features predictable.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1600&auto=format&fit=crop",
    readTimeMinutes: 8,
    dateISO: "2026-03-28",
    author: { name: "Anaya Roy", role: "Frontend Engineering" },
    tags: ["next.js", "typescript", "architecture"],
    paragraphs: [
      "When codebases grow, the real problem isn't lines of code. It's the number of places that must change for a single feature. The goal is to reduce blast radius.",
      "A scalable frontend uses boundaries: clear module ownership, predictable data flows, and components that can evolve without breaking layout semantics.",
      "Invest in quality gates (linting, types, and testing where it matters). Then use incremental refactors so improvements compound instead of pausing delivery.",
    ],
  },
  {
    id: "blog-editorial-ux",
    type: "blog",
    slug: "editorial-ux-for-modern-products",
    category: "Design",
    title: "Editorial UX for Modern Products: Make the interface breathe",
    excerpt: "Great UX feels confident. Learn how typography, spacing, and rhythm make complex products easier to use.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop",
    readTimeMinutes: 5,
    dateISO: "2026-04-13",
    author: { name: "Neel Verma", role: "Design Systems" },
    tags: ["typography", "layout", "accessibility"],
    paragraphs: [
      "Editorial interfaces guide attention with hierarchy. When spacing and typography are consistent, users can scan quickly and decide faster.",
      "Build rhythm with reusable layout primitives: section headers, metadata rows, and card-to-panel transitions that work across the app.",
      "Don't forget accessibility: contrast, readable sizes, and clear focus states are essential for both design quality and usability.",
    ],
  },
  {
    id: "blog-growth-experiments",
    type: "blog",
    slug: "growth-experiments-that-stick",
    category: "Growth",
    title: "Growth Experiments That Stick: A repeatable iteration loop",
    excerpt: "How to run experiments without losing product quality: define hypotheses, measure impact, then design the next iteration.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop",
    readTimeMinutes: 6,
    dateISO: "2026-03-19",
    author: { name: "Sana Iyer", role: "Growth Strategy" },
    tags: ["experimentation", "metrics", "product ops"],
    paragraphs: [
      "The best experiment programs feel like product development. Every test changes something meaningful, and the learning becomes part of the roadmap.",
      "Start with hypotheses that connect behavior to metrics. Then instrument what you need before you launch the change.",
      "When results come in, design the next iteration as a continuation of the system, not a one-off page.",
    ],
  },
  {
    id: "blog-motion-microinteractions",
    type: "blog",
    slug: "microinteractions-that-convince",
    category: "Motion",
    title: "Microinteractions That Convince: Small cues, big clarity",
    excerpt: "Microinteractions help users trust what they see. Learn patterns for hover, loading, and confirmation states.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1600&auto=format&fit=crop",
    readTimeMinutes: 4,
    dateISO: "2026-02-26",
    author: { name: "Kunal Desai", role: "Motion Systems" },
    tags: ["microinteractions", "ui states", "ux"],
    paragraphs: [
      "Users form mental models quickly. Microinteractions can update that model instantly: hover tells you something is actionable, loading communicates progress, and confirmations reduce doubt.",
      "Treat each state like a design contract. If your app behaves predictably, users move faster and make fewer mistakes.",
      "Keep transitions subtle and consistent with your overall motion language. The goal is clarity, not spectacle.",
    ],
  },
];

export const insightPosts = editorialPosts.filter((p) => p.type === "insight");
export const blogPosts = editorialPosts.filter((p) => p.type === "blog");

// ─── Per-service rich page data ───────────────────────────────────────────────

export type ServiceCapability = {
  title: string;
  body: string;
  tag: string;
};

export type ServiceMetric = {
  value: string;
  label: string;
  sub: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceProcess = {
  num: string;
  title: string;
  body: string;
};

export type ServicePageData = {
  slug: string;
  accentFrom: string;   // tailwind gradient from colour (inline style)
  accentTo: string;     // tailwind gradient to colour
  heroEyebrow: string;
  heroLine1: string;
  heroLine2: string;    // dimmed line
  heroLine3: string;
  heroSub: string;
  whyHeadline: string;
  whyBody: string[];
  whyCardStat: string;
  whyCardLabel: string;
  capabilities: ServiceCapability[];
  growthHeadline: string;
  growthSub: string;
  metrics: ServiceMetric[];
  process: ServiceProcess[];
  projectSlugs: string[];   // subset of projects[] to show in carousel
  faqs: ServiceFaq[];
  ctaHeadline: string[];    // two lines
  ctaSub: string;
};

export const servicePages: ServicePageData[] = [
  // ── SaaS Development ────────────────────────────────────────────────────────
  {
    slug: "saas-development",
    accentFrom: "#06b6d4",
    accentTo: "#6d28d9",
    heroEyebrow: "SaaS Platforms · Product Engineering",
    heroLine1: "Software that",
    heroLine2: "scales with",
    heroLine3: "your ambition.",
    heroSub: "We architect and ship SaaS products that are fast, resilient, and built to grow — from zero to enterprise.",
    whyHeadline: "Why SaaS architecture matters more than features",
    whyBody: [
      "Most SaaS products fail not because of bad ideas, but because the foundation can't hold the weight of growth. Slow queries, brittle integrations, and inconsistent UX erode trust faster than any competitor.",
      "We build the system first — data models, API contracts, auth flows, and component architecture — so every feature you ship lands on solid ground. The result is a product that feels fast, behaves predictably, and scales without rewrites.",
    ],
    whyCardStat: "3×",
    whyCardLabel: "Faster time-to-feature after system foundations are set",
    capabilities: [
      { title: "Product Architecture", body: "Multi-tenant data models, API design, auth systems, and service boundaries built for scale.", tag: "Foundation" },
      { title: "Dashboard & Analytics UI", body: "Complex data surfaces made scannable — charts, tables, filters, and real-time updates that don't overwhelm.", tag: "Interface" },
      { title: "Onboarding Flows", body: "First-run experiences that activate users fast and reduce time-to-value from days to minutes.", tag: "Activation" },
      { title: "Billing & Subscriptions", body: "Stripe-powered plans, usage metering, upgrade flows, and dunning — revenue infrastructure that just works.", tag: "Revenue" },
      { title: "Integrations & APIs", body: "Webhooks, OAuth connections, and public APIs that make your product the hub of your customer's stack.", tag: "Ecosystem" },
      { title: "Performance Engineering", body: "Edge caching, query optimisation, and bundle discipline so your app stays fast as data grows.", tag: "Speed" },
    ],
    growthHeadline: "How SaaS engineering drives market growth",
    growthSub: "A well-engineered SaaS product compounds. Every performance win, every smooth onboarding, every reliable integration becomes a retention and referral engine.",
    metrics: [
      { value: "68%", label: "Reduction in churn", sub: "when onboarding is redesigned around activation milestones" },
      { value: "4.2×", label: "Faster feature velocity", sub: "after component systems and API contracts are established" },
      { value: "99.9%", label: "Uptime target", sub: "through edge deployment, health checks, and graceful degradation" },
      { value: "2 weeks", label: "To first working prototype", sub: "using our accelerated discovery-to-build sprint model" },
    ],
    process: [
      { num: "01", title: "Architecture Sprint", body: "We map your product's data model, user flows, and technical constraints before writing a line of code." },
      { num: "02", title: "Build in Layers", body: "Core infrastructure first, then UI systems, then features — each layer tested and stable before the next." },
      { num: "03", title: "Ship & Instrument", body: "Deploy with analytics, error tracking, and performance budgets baked in from day one." },
    ],
    projectSlugs: ["axiom-finance-platform", "helix-ai-workspace", "nexora-health-dashboard"],
    faqs: [
      { q: "Do you build from scratch or work with existing codebases?", a: "Both. We can greenfield a new product or step into an existing codebase to refactor, extend, or stabilise it." },
      { q: "What stack do you use?", a: "Next.js, TypeScript, Postgres, and Tailwind are our defaults — but we adapt to what your team already owns and maintains." },
      { q: "Can you handle the design and engineering together?", a: "Yes. Our teams work in parallel so design decisions are always grounded in what's actually buildable." },
      { q: "How do you handle multi-tenancy?", a: "We design tenant isolation at the data layer from day one — row-level security, scoped APIs, and clean permission models." },
    ],
    ctaHeadline: ["Build the SaaS", "product you meant to."],
    ctaSub: "Let's talk architecture, scope, and what it takes to ship something that lasts.",
  },

  // ── UI/UX Design ─────────────────────────────────────────────────────────────
  {
    slug: "ui-ux-design",
    accentFrom: "#a855f7",
    accentTo: "#ec4899",
    heroEyebrow: "UI/UX Systems · Interface Design",
    heroLine1: "Interfaces that",
    heroLine2: "people actually",
    heroLine3: "want to use.",
    heroSub: "We design digital experiences that reduce friction, build trust, and make complex products feel effortless.",
    whyHeadline: "Why interface design is a business decision",
    whyBody: [
      "Every confusing screen is a support ticket. Every unclear flow is a churned user. Interface quality isn't aesthetic preference — it's directly measurable in activation rates, retention, and NPS.",
      "We approach UI/UX as a system problem: consistent components, clear information hierarchy, and interaction patterns that users learn once and apply everywhere. The result is a product that feels coherent, not cobbled together.",
    ],
    whyCardStat: "↑ 41%",
    whyCardLabel: "Average increase in user activation after UX redesign",
    capabilities: [
      { title: "Design Systems", body: "Token-based component libraries that scale across teams, products, and platforms without drift.", tag: "System" },
      { title: "User Research & Testing", body: "Interviews, usability sessions, and heuristic audits that replace assumptions with evidence.", tag: "Research" },
      { title: "Information Architecture", body: "Navigation, taxonomy, and content structure that makes finding things feel obvious.", tag: "Structure" },
      { title: "Interaction Design", body: "Micro-animations, state transitions, and feedback patterns that make the interface feel alive and responsive.", tag: "Motion" },
      { title: "Responsive & Adaptive UI", body: "Layouts that work beautifully from mobile to ultrawide — not just technically, but experientially.", tag: "Responsive" },
      { title: "Accessibility", body: "WCAG-informed contrast, keyboard navigation, and screen reader patterns built in from the start.", tag: "Inclusive" },
    ],
    growthHeadline: "How great UX compounds into market advantage",
    growthSub: "Design quality is one of the few moats that's hard to copy. When your product feels better than the competition, users stay, refer, and forgive the occasional bug.",
    metrics: [
      { value: "41%", label: "Higher activation", sub: "when onboarding UX is redesigned around user goals, not feature lists" },
      { value: "60%", label: "Fewer support tickets", sub: "after navigation and information architecture are restructured" },
      { value: "2.8×", label: "Longer session depth", sub: "in products with consistent motion and interaction feedback systems" },
      { value: "35%", label: "Faster design-to-dev", sub: "when a token-based design system is in place from the start" },
    ],
    process: [
      { num: "01", title: "Audit & Research", body: "We map existing flows, run heuristic reviews, and talk to real users before touching a single frame." },
      { num: "02", title: "System Before Screens", body: "Tokens, components, and patterns first — then we compose screens from a stable foundation." },
      { num: "03", title: "Prototype & Validate", body: "High-fidelity prototypes tested with real users before handoff, so engineering builds the right thing." },
    ],
    projectSlugs: ["nexora-health-dashboard", "axiom-finance-platform", "velocity-commerce-suite"],
    faqs: [
      { q: "Do you deliver Figma files or just specs?", a: "Full Figma files with organised components, auto-layout, and developer-ready specs — plus a handoff session." },
      { q: "Can you work with our existing design system?", a: "Yes. We can audit, extend, or refactor an existing system rather than starting from scratch." },
      { q: "Do you do user research or just visual design?", a: "Both. Research informs every design decision — we don't separate strategy from craft." },
      { q: "How do you handle design-engineering handoff?", a: "We use Figma's dev mode, annotate edge cases, and stay available during implementation to answer questions." },
    ],
    ctaHeadline: ["Design that works", "as hard as you do."],
    ctaSub: "Book a call and let's talk about what your product needs to feel right.",
  },

  // ── Web Development ──────────────────────────────────────────────────────────
  {
    slug: "web-development",
    accentFrom: "#06b6d4",
    accentTo: "#10b981",
    heroEyebrow: "Web Development · Frontend Engineering",
    heroLine1: "Fast, precise,",
    heroLine2: "engineered to",
    heroLine3: "perform.",
    heroSub: "We build web experiences that load instantly, rank well, and hold up under real-world traffic — without compromise.",
    whyHeadline: "Why web performance is a growth lever",
    whyBody: [
      "A 1-second delay in page load reduces conversions by 7%. A poor Core Web Vitals score pushes you down in search rankings. Web performance isn't a technical nicety — it's directly tied to revenue.",
      "We engineer for speed from the start: edge deployment, optimised asset pipelines, server components where they belong, and client interactivity only where it's needed. The result is a site that feels instant and ranks where it should.",
    ],
    whyCardStat: "< 1s",
    whyCardLabel: "Target LCP on every project we ship",
    capabilities: [
      { title: "Next.js & React Engineering", body: "App Router, Server Components, streaming, and edge functions — the full modern stack, used correctly.", tag: "Core" },
      { title: "Performance Optimisation", body: "Core Web Vitals, bundle analysis, image pipelines, and caching strategies that keep scores green.", tag: "Speed" },
      { title: "CMS Integration", body: "Headless CMS setups with Sanity, Contentful, or Payload — structured content that editors can actually use.", tag: "Content" },
      { title: "Animation & Motion", body: "Framer Motion, GSAP, and CSS transitions that add life without killing performance budgets.", tag: "Motion" },
      { title: "SEO Architecture", body: "Semantic HTML, metadata systems, structured data, and sitemap infrastructure built into the foundation.", tag: "SEO" },
      { title: "CI/CD & Deployment", body: "Vercel, AWS, or custom pipelines with preview environments, automated checks, and zero-downtime deploys.", tag: "DevOps" },
    ],
    growthHeadline: "How engineering quality drives organic growth",
    growthSub: "Search engines reward fast, well-structured sites. Users reward fast, well-structured sites. Engineering quality is the multiplier that makes every other investment work harder.",
    metrics: [
      { value: "< 1s", label: "LCP target", sub: "achieved on every project through edge deployment and asset optimisation" },
      { value: "↑ 28%", label: "Organic traffic", sub: "average increase after Core Web Vitals and SEO architecture improvements" },
      { value: "100", label: "Lighthouse score", sub: "performance, accessibility, best practices, and SEO — all green" },
      { value: "0", label: "Downtime deploys", sub: "using preview environments, rollback strategies, and staged releases" },
    ],
    process: [
      { num: "01", title: "Architecture First", body: "We define routing, data fetching strategy, and component boundaries before writing a line of UI." },
      { num: "02", title: "Build with Budgets", body: "Performance budgets, accessibility checks, and type safety enforced throughout — not bolted on at the end." },
      { num: "03", title: "Ship & Monitor", body: "Deploy to edge, instrument with analytics and error tracking, and iterate based on real data." },
    ],
    projectSlugs: ["velocity-commerce-suite", "helix-ai-workspace", "axiom-finance-platform"],
    faqs: [
      { q: "Do you work with existing sites or only greenfield?", a: "Both. We can rebuild, refactor, or extend — whatever gets you to the right outcome fastest." },
      { q: "What CMS do you recommend?", a: "Sanity for most projects — it's flexible, developer-friendly, and has excellent Next.js integration. We'll recommend based on your content needs." },
      { q: "How do you handle SEO during a rebuild?", a: "We audit existing rankings, map redirects, and build the new site with SEO architecture from day one — no traffic drops." },
      { q: "Can you work with our in-house team?", a: "Yes. We can embed alongside your team, lead specific workstreams, or hand off with full documentation." },
    ],
    ctaHeadline: ["Ship something", "worth loading."],
    ctaSub: "Let's talk about your project, your timeline, and what fast actually looks like.",
  },

  // ── Growth & Marketing ───────────────────────────────────────────────────────
  {
    slug: "growth-marketing",
    accentFrom: "#f59e0b",
    accentTo: "#ef4444",
    heroEyebrow: "Growth & Optimisation · Marketing Systems",
    heroLine1: "Growth that",
    heroLine2: "compounds,",
    heroLine3: "not just spikes.",
    heroSub: "We build the systems, experiments, and creative infrastructure that turn traffic into revenue — and revenue into retention.",
    whyHeadline: "Why most growth efforts don't stick",
    whyBody: [
      "Most growth tactics produce short-term spikes that fade. The teams that win long-term build systems: experiment loops, conversion infrastructure, and content engines that compound over time.",
      "We focus on the levers that actually move the needle — activation, retention, and referral — and we instrument everything so you know what's working and why. No vanity metrics, no spray-and-pray.",
    ],
    whyCardStat: "3.4×",
    whyCardLabel: "Average ROAS improvement after conversion infrastructure rebuild",
    capabilities: [
      { title: "Conversion Rate Optimisation", body: "Landing page audits, A/B testing infrastructure, and funnel analysis that turns more visitors into customers.", tag: "CRO" },
      { title: "SEO & Content Strategy", body: "Keyword architecture, content systems, and technical SEO that build compounding organic traffic.", tag: "SEO" },
      { title: "Analytics & Attribution", body: "GA4, Mixpanel, or custom event tracking — clean data pipelines that tell you what's actually driving growth.", tag: "Data" },
      { title: "Email & Lifecycle", body: "Onboarding sequences, re-engagement flows, and retention campaigns built around user behaviour, not calendars.", tag: "Lifecycle" },
      { title: "Paid Acquisition", body: "Meta, Google, and LinkedIn campaigns with creative systems and landing pages built to convert.", tag: "Paid" },
      { title: "Growth Experimentation", body: "Hypothesis-driven test cycles with statistical rigour — so you learn fast and scale what works.", tag: "Experiments" },
    ],
    growthHeadline: "How systematic growth creates durable market position",
    growthSub: "Compounding growth comes from stacking small wins: better activation, lower churn, higher referral rates. Each improvement makes the next one easier.",
    metrics: [
      { value: "3.4×", label: "ROAS improvement", sub: "after rebuilding conversion infrastructure and landing page systems" },
      { value: "↓ 52%", label: "CAC reduction", sub: "through SEO compounding and referral loop activation" },
      { value: "↑ 38%", label: "Email revenue", sub: "after lifecycle sequences are rebuilt around behavioural triggers" },
      { value: "14 days", label: "First experiment live", sub: "from kickoff to running A/B test with statistical tracking in place" },
    ],
    process: [
      { num: "01", title: "Audit & Baseline", body: "We map your funnel, identify the biggest leaks, and establish baselines before touching anything." },
      { num: "02", title: "Build the System", body: "Tracking, testing infrastructure, and content architecture — the foundation that makes experiments meaningful." },
      { num: "03", title: "Run, Learn, Scale", body: "Rapid experiment cycles with clear hypotheses, clean data, and a bias toward scaling what works." },
    ],
    projectSlugs: ["velocity-commerce-suite", "axiom-finance-platform", "helix-ai-workspace"],
    faqs: [
      { q: "Do you run ads or just strategy?", a: "Both. We can own the full paid acquisition stack or work alongside your media buyer to improve creative and landing pages." },
      { q: "How quickly will we see results?", a: "Quick wins in 2–4 weeks from CRO and email. SEO compounds over 3–6 months. We're transparent about timelines." },
      { q: "Do you need access to our analytics?", a: "Yes — we can't improve what we can't measure. We'll audit your current setup and fix tracking gaps before anything else." },
      { q: "Can you work with our existing marketing team?", a: "Absolutely. We often embed as a specialist layer — handling the technical and experimental side while your team owns brand and content." },
    ],
    ctaHeadline: ["Build growth that", "doesn't need babysitting."],
    ctaSub: "Let's audit your funnel and find the levers worth pulling.",
  },
];

// ─── Extended project data for portfolio page ─────────────────────────────────

export type PortfolioProject = {
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string;
  highlights: string[];
  service: "saas-development" | "ui-ux-design" | "web-development" | "growth-marketing";
  year: string;
  tags: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Axiom Finance Platform",
    slug: "axiom-finance-platform",
    summary: "Cinematic B2B finance workspace for modern teams.",
    coverImageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Design system for complex dashboards", "Motion-first UI choreography", "Secure workflow automation"],
    service: "saas-development",
    year: "2025",
    tags: ["SaaS", "Dashboard", "Finance"],
  },
  {
    title: "Nexora Health Dashboard",
    slug: "nexora-health-dashboard",
    summary: "Unified clinical operations dashboard with premium UX systems.",
    coverImageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Accessibility-led UX", "Fast data visualization patterns", "Operational clarity at a glance"],
    service: "ui-ux-design",
    year: "2025",
    tags: ["UI/UX", "Health", "Design System"],
  },
  {
    title: "Velocity Commerce Suite",
    slug: "velocity-commerce-suite",
    summary: "Conversion-driven commerce platform with modular frontend architecture.",
    coverImageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Component-driven storefront UX", "Performance budget discipline", "Scalable experimentation loop"],
    service: "web-development",
    year: "2024",
    tags: ["Web Dev", "Commerce", "Performance"],
  },
  {
    title: "Helix AI Workspace",
    slug: "helix-ai-workspace",
    summary: "AI-assisted productivity environment with advanced motion interactions.",
    coverImageUrl: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1600&auto=format&fit=crop",
    highlights: ["AI-assisted flows with guardrails", "Micro-interaction polish", "Scalable frontend architecture"],
    service: "saas-development",
    year: "2025",
    tags: ["SaaS", "AI", "Motion"],
  },
  {
    title: "Prism Brand Identity",
    slug: "prism-brand-identity",
    summary: "Full visual identity and design system for a next-gen analytics startup.",
    coverImageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Token-based design system", "Brand guidelines & motion language", "Cross-platform consistency"],
    service: "ui-ux-design",
    year: "2024",
    tags: ["UI/UX", "Branding", "Design System"],
  },
  {
    title: "Orbit Growth Engine",
    slug: "orbit-growth-engine",
    summary: "Full-funnel growth infrastructure for a Series A SaaS company.",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    highlights: ["CRO & A/B testing infrastructure", "SEO architecture rebuild", "Email lifecycle automation"],
    service: "growth-marketing",
    year: "2024",
    tags: ["Growth", "SEO", "CRO"],
  },
  {
    title: "Stratum Web Platform",
    slug: "stratum-web-platform",
    summary: "High-performance marketing site with sub-second load times and editorial motion.",
    coverImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    highlights: ["100 Lighthouse score", "Headless CMS integration", "GSAP scroll choreography"],
    service: "web-development",
    year: "2025",
    tags: ["Web Dev", "Performance", "Motion"],
  },
  {
    title: "Luma Retail Experience",
    slug: "luma-retail-experience",
    summary: "Immersive e-commerce experience with 3D product previews and conversion-led UX.",
    coverImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    highlights: ["3D product interaction", "Conversion-optimised checkout", "Mobile-first performance"],
    service: "growth-marketing",
    year: "2025",
    tags: ["Growth", "Commerce", "UX"],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "They didn't just build what we asked for — they challenged our assumptions and delivered something far better. The product feels alive in a way we didn't think was possible.",
    author: "Sarah Chen",
    role: "CPO",
    company: "Axiom Finance",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "The design system they built has scaled across three product lines without a single inconsistency. That's not luck — that's craft.",
    author: "Marcus Webb",
    role: "Head of Product",
    company: "Nexora Health",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "Our conversion rate went up 34% in the first month after launch. The combination of performance engineering and CRO thinking is genuinely rare.",
    author: "Priya Nair",
    role: "CEO",
    company: "Velocity Commerce",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "Working with this team felt like having a co-founder who happened to be a world-class engineer and designer. They care about the outcome, not just the deliverable.",
    author: "James Okafor",
    role: "Founder",
    company: "Helix AI",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "The site they built ranks on page one for every target keyword. The SEO architecture was invisible to users but incredibly effective for growth.",
    author: "Lena Müller",
    role: "Marketing Director",
    company: "Stratum",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
];

// ─── Case Study rich data ─────────────────────────────────────────────────────

export type CaseStudySection = {
  label: string;
  heading: string;
  body: string[];
};

export type CaseStudyResult = {
  value: string;
  label: string;
};

export type CaseStudyImage = {
  url: string;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  service: string;
  serviceSlug: string;
  year: string;
  duration: string;
  role: string;
  accentColor: string;
  coverImageUrl: string;
  galleryImages: CaseStudyImage[];
  overview: string;
  sections: CaseStudySection[];
  results: CaseStudyResult[];
  testimonial?: { quote: string; author: string; role: string };
  nextSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "axiom-finance-platform",
    client: "Axiom Finance",
    service: "SaaS Development",
    serviceSlug: "saas-development",
    year: "2025",
    duration: "14 weeks",
    role: "Product Engineering · UI/UX",
    accentColor: "#06b6d4",
    coverImageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop", caption: "Dashboard overview" },
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop", caption: "Analytics module" },
      { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop", caption: "Workflow automation" },
    ],
    overview: "Axiom needed a B2B finance workspace that could handle complex multi-entity workflows without sacrificing the clarity their analysts demanded. We rebuilt the product from the data layer up — new API contracts, a motion-first design system, and a dashboard architecture that scales to thousands of concurrent users.",
    sections: [
      {
        label: "The Challenge",
        heading: "A product held together by workarounds",
        body: [
          "Axiom's existing platform had grown organically over four years. Every new feature was bolted onto a brittle foundation — inconsistent data models, duplicated UI patterns, and a frontend that took 8 seconds to load on a good day.",
          "Their analysts were spending more time fighting the tool than using it. Churn was climbing. The engineering team was paralysed by technical debt. They needed a complete rebuild, but couldn't afford to stop shipping.",
        ],
      },
      {
        label: "Our Approach",
        heading: "System first, screens second",
        body: [
          "We started with a two-week architecture sprint — mapping every data entity, API contract, and user flow before writing a line of UI. This gave us a stable foundation that the design and engineering teams could build on in parallel.",
          "The design system was built token-first: spacing, colour, typography, and motion all defined as variables before any component was composed. This meant every screen we built was consistent by default, not by accident.",
          "We used a strangler fig pattern for the migration — new modules replaced old ones incrementally, so Axiom's team could keep shipping features while we rebuilt the foundation beneath them.",
        ],
      },
      {
        label: "The Solution",
        heading: "A workspace that thinks like a finance team",
        body: [
          "The new platform centres on a unified workspace model — every entity, transaction, and workflow visible from a single context. Navigation is spatial rather than hierarchical, so analysts can move between related data without losing their place.",
          "We built a custom charting system optimised for financial data: sparklines, waterfall charts, and variance tables that render in under 50ms even with 10,000-row datasets. Every interaction has a corresponding motion state — loading, updating, error — so the interface always communicates what's happening.",
          "The design system shipped with 140 components, full dark mode, and a Figma library that the Axiom design team now owns and extends independently.",
        ],
      },
    ],
    results: [
      { value: "8s → 0.9s", label: "Load time improvement" },
      { value: "↓ 62%", label: "Support tickets in 90 days" },
      { value: "↑ 38%", label: "Daily active usage" },
      { value: "140", label: "Design system components" },
    ],
    testimonial: {
      quote: "They didn't just build what we asked for — they challenged our assumptions and delivered something far better. The product feels alive in a way we didn't think was possible.",
      author: "Sarah Chen",
      role: "CPO, Axiom Finance",
    },
    nextSlug: "helix-ai-workspace",
  },
  {
    slug: "nexora-health-dashboard",
    client: "Nexora Health",
    service: "UI/UX Design",
    serviceSlug: "ui-ux-design",
    year: "2025",
    duration: "10 weeks",
    role: "UX Research · Design Systems",
    accentColor: "#a855f7",
    coverImageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1600&auto=format&fit=crop", caption: "Patient overview" },
      { url: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1600&auto=format&fit=crop", caption: "Clinical workflow" },
      { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop", caption: "Data visualisation" },
    ],
    overview: "Nexora's clinical operations dashboard was technically functional but cognitively exhausting. Nurses and coordinators were making errors not because of bad data, but because the interface made it impossible to find the right information at the right moment. We redesigned the entire experience around how clinical teams actually think.",
    sections: [
      {
        label: "The Challenge",
        heading: "Information overload in a high-stakes environment",
        body: [
          "Clinical staff were navigating 12 different screens to complete a single patient handoff. The dashboard showed everything — which meant it effectively showed nothing. Critical alerts were buried in the same visual weight as routine updates.",
          "The stakes were real: missed information in a clinical setting isn't a UX problem, it's a patient safety problem. We needed to redesign without disrupting workflows that staff had spent years learning.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Research before redesign",
        body: [
          "We spent the first three weeks embedded with clinical teams — shadowing shifts, running contextual interviews, and mapping every decision point in the patient care workflow. We identified 23 distinct user tasks and ranked them by frequency and cognitive load.",
          "The redesign was driven by a single principle: the most important information should require the least effort to find. We built a progressive disclosure system — summary first, detail on demand — that reduced the average number of clicks per task from 7 to 2.",
        ],
      },
      {
        label: "The Solution",
        heading: "Clarity as a clinical tool",
        body: [
          "The new dashboard uses a three-tier information hierarchy: critical alerts at the top, active tasks in the middle, and reference data accessible but out of the way. Colour is used exclusively for status — not decoration — so staff can scan a ward at a glance.",
          "We built a full accessibility layer: WCAG AA contrast throughout, keyboard navigation for every workflow, and screen reader support for the alert system. The design system shipped with 80 components and a comprehensive usage guide for the Nexora engineering team.",
        ],
      },
    ],
    results: [
      { value: "↓ 71%", label: "Task completion time" },
      { value: "↓ 58%", label: "Navigation errors" },
      { value: "↑ 41%", label: "Staff satisfaction score" },
      { value: "80", label: "Accessible components" },
    ],
    testimonial: {
      quote: "The design system they built has scaled across three product lines without a single inconsistency. That's not luck — that's craft.",
      author: "Marcus Webb",
      role: "Head of Product, Nexora Health",
    },
    nextSlug: "velocity-commerce-suite",
  },
  {
    slug: "velocity-commerce-suite",
    client: "Velocity Commerce",
    service: "Web Development",
    serviceSlug: "web-development",
    year: "2024",
    duration: "12 weeks",
    role: "Frontend Engineering · Performance",
    accentColor: "#10b981",
    coverImageUrl: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop", caption: "Storefront experience" },
      { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop", caption: "Product detail page" },
      { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop", caption: "Checkout flow" },
    ],
    overview: "Velocity's existing storefront was losing 34% of mobile visitors before they reached the product page. The culprit was a 6.2-second LCP on mobile — a legacy of accumulated technical debt and an image pipeline that hadn't been touched in three years. We rebuilt the frontend from scratch with performance as the primary design constraint.",
    sections: [
      {
        label: "The Challenge",
        heading: "Speed as a conversion problem",
        body: [
          "Every 100ms of load time was costing Velocity an estimated $40,000 in monthly revenue. Their Lighthouse score was 31. Their largest contentful paint was 6.2 seconds on a mid-range Android device. The engineering team knew it was bad — they just didn't have the bandwidth to fix it.",
          "The rebuild had to happen without disrupting the existing SEO rankings that were driving 60% of their traffic. Every URL, every redirect, every structured data schema had to be preserved or improved.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Performance budget from day one",
        body: [
          "We set a hard performance budget before writing a single component: LCP under 1.2s, TBT under 200ms, CLS under 0.1. Every architectural decision — server vs client components, image formats, font loading strategy — was evaluated against these constraints.",
          "We rebuilt the image pipeline with next/image, AVIF format, and a custom CDN configuration that serves appropriately sized images based on device and connection. The product gallery went from 2.4MB to 180KB per page load.",
        ],
      },
      {
        label: "The Solution",
        heading: "A storefront that earns its traffic",
        body: [
          "The new frontend is built on Next.js App Router with aggressive use of Server Components — only the cart, wishlist, and personalisation layers run on the client. The result is a storefront that renders the critical path in under 800ms on a 4G connection.",
          "We rebuilt the checkout flow with a single-page architecture that eliminates full page reloads between steps. Combined with optimistic UI updates and skeleton loading states, the perceived performance is near-instant.",
          "SEO was treated as an engineering discipline: semantic HTML, JSON-LD structured data for every product, a dynamic sitemap, and canonical URL management that preserved every existing ranking.",
        ],
      },
    ],
    results: [
      { value: "6.2s → 0.8s", label: "LCP improvement" },
      { value: "↑ 34%", label: "Conversion rate" },
      { value: "100", label: "Lighthouse score" },
      { value: "↑ 28%", label: "Organic traffic in 60 days" },
    ],
    testimonial: {
      quote: "Our conversion rate went up 34% in the first month after launch. The combination of performance engineering and CRO thinking is genuinely rare.",
      author: "Priya Nair",
      role: "CEO, Velocity Commerce",
    },
    nextSlug: "helix-ai-workspace",
  },
  {
    slug: "helix-ai-workspace",
    client: "Helix AI",
    service: "SaaS Development",
    serviceSlug: "saas-development",
    year: "2025",
    duration: "16 weeks",
    role: "Product Engineering · Motion Design",
    accentColor: "#6d28d9",
    coverImageUrl: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop", caption: "AI workspace overview" },
      { url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop", caption: "Prompt interface" },
      { url: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=1600&auto=format&fit=crop", caption: "Output management" },
    ],
    overview: "Helix needed a productivity workspace that made AI feel like a natural extension of how their users already worked — not a separate tool they had to context-switch into. We designed and built an environment where AI assistance is ambient, contextual, and always one keystroke away.",
    sections: [
      {
        label: "The Challenge",
        heading: "Making AI feel native, not bolted on",
        body: [
          "Most AI tools feel like a chat interface grafted onto a productivity app. Helix wanted something different: AI that understood the context of what you were working on and offered assistance without interrupting your flow.",
          "The technical challenge was significant — streaming responses, real-time collaboration, and a plugin architecture that let enterprise customers extend the workspace with their own AI models and data sources.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Motion as the interface layer",
        body: [
          "We treated motion as a first-class design material. Every AI interaction — generating, thinking, completing, erroring — has a distinct motion signature that communicates state without requiring the user to read status text.",
          "The architecture uses a custom streaming layer built on top of the Vercel AI SDK, with optimistic UI updates that make responses feel instant even when the model is still generating. We built a plugin system using a sandboxed iframe architecture that keeps third-party code isolated without sacrificing performance.",
        ],
      },
      {
        label: "The Solution",
        heading: "A workspace that thinks with you",
        body: [
          "The Helix workspace uses a spatial canvas model — documents, AI threads, and data sources exist as objects in a shared space rather than tabs in a navigation hierarchy. Users can pull context from any object into any AI interaction with a drag gesture.",
          "We built 60 micro-interactions that make the workspace feel alive: cursor trails on AI-generated content, breathing animations on active AI processes, and a custom text rendering system that makes streaming output feel like watching someone type rather than watching a progress bar.",
        ],
      },
    ],
    results: [
      { value: "↑ 3.2×", label: "Session length vs v1" },
      { value: "< 80ms", label: "Perceived response latency" },
      { value: "60", label: "Custom micro-interactions" },
      { value: "↑ 89%", label: "User retention at 30 days" },
    ],
    testimonial: {
      quote: "Working with this team felt like having a co-founder who happened to be a world-class engineer and designer. They care about the outcome, not just the deliverable.",
      author: "James Okafor",
      role: "Founder, Helix AI",
    },
    nextSlug: "axiom-finance-platform",
  },
  {
    slug: "prism-brand-identity",
    client: "Prism Analytics",
    service: "UI/UX Design",
    serviceSlug: "ui-ux-design",
    year: "2024",
    duration: "8 weeks",
    role: "Brand Identity · Design Systems",
    accentColor: "#ec4899",
    coverImageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop", caption: "Brand identity system" },
      { url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&auto=format&fit=crop", caption: "Component library" },
      { url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1600&auto=format&fit=crop", caption: "Motion language" },
    ],
    overview: "Prism was launching a next-gen analytics platform into a crowded market. Their product was technically superior, but their brand looked like every other B2B SaaS company. We built a visual identity and design system that made Prism impossible to ignore — and impossible to confuse with anyone else.",
    sections: [
      {
        label: "The Challenge",
        heading: "Standing out in a sea of sameness",
        body: [
          "The analytics space is dominated by brands that look identical: dark navy, orange accents, stock photography of dashboards. Prism's product was genuinely different — it needed a brand that communicated that difference before a single feature was explained.",
          "The design system also had to work across three distinct surfaces: a marketing site, a product dashboard, and a mobile app — each with different constraints and user contexts.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Identity as a system, not a logo",
        body: [
          "We started with a brand strategy sprint — defining Prism's positioning, personality, and the emotional territory they wanted to own. The visual identity emerged from that strategy, not the other way around.",
          "The core visual idea was refraction: the way a prism breaks white light into its component colours became a metaphor for how Prism breaks complex data into clear insight. This idea runs through every element of the identity — the logo, the colour system, the motion language.",
        ],
      },
      {
        label: "The Solution",
        heading: "A brand that earns attention",
        body: [
          "The identity system uses a dynamic colour palette — a neutral dark base with a spectrum of accent colours that shift based on context. Data categories get distinct colours; UI chrome stays neutral. The result is a dashboard that's visually rich without being chaotic.",
          "The design system shipped with 120 components, a comprehensive motion guide, and a brand book that covers everything from email signatures to conference booth design. Prism's team can now extend the system independently without losing coherence.",
        ],
      },
    ],
    results: [
      { value: "120", label: "Design system components" },
      { value: "3", label: "Platforms covered" },
      { value: "↑ 2.4×", label: "Demo request rate post-launch" },
      { value: "8 weeks", label: "Full system delivered" },
    ],
    nextSlug: "orbit-growth-engine",
  },
  {
    slug: "orbit-growth-engine",
    client: "Orbit SaaS",
    service: "Growth & Optimisation",
    serviceSlug: "growth-marketing",
    year: "2024",
    duration: "6 months",
    role: "Growth Strategy · CRO · SEO",
    accentColor: "#f59e0b",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop", caption: "Analytics dashboard" },
      { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop", caption: "Funnel analysis" },
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop", caption: "Experiment results" },
    ],
    overview: "Orbit had strong product-market fit but a leaky funnel. 68% of trial signups never activated. Their SEO was generating traffic but not leads. We rebuilt their growth infrastructure from the ground up — tracking, testing, content, and lifecycle — and ran 24 experiments in 6 months.",
    sections: [
      {
        label: "The Challenge",
        heading: "Traffic without traction",
        body: [
          "Orbit was spending $40k/month on paid acquisition into a funnel that converted at 1.2%. Their analytics were broken — events were firing inconsistently, attribution was unreliable, and the team was making decisions based on data they couldn't trust.",
          "The SEO strategy was producing pageviews but not pipeline. High-volume keywords, low-intent visitors. The content team was working hard but optimising for the wrong metrics.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Fix the foundation before scaling",
        body: [
          "Week one was entirely analytics. We audited every tracking implementation, rebuilt the event taxonomy from scratch, and set up a clean attribution model that could distinguish between organic, paid, and referral traffic at the user level.",
          "With clean data, we ran a full funnel audit — mapping every step from first touch to activation and identifying the three biggest drop-off points. These became the first three experiments.",
        ],
      },
      {
        label: "The Solution",
        heading: "A growth system that compounds",
        body: [
          "We rebuilt the onboarding flow around a single activation milestone — the moment users first experienced Orbit's core value. Time-to-activation dropped from 4 days to 6 hours. Trial-to-paid conversion went from 8% to 21%.",
          "The SEO strategy shifted from volume to intent — targeting bottom-of-funnel keywords with dedicated landing pages built to convert. Organic pipeline grew 3.4× in 90 days.",
          "We set up a full lifecycle email system — 14 behavioural triggers, 6 re-engagement sequences, and a churn prediction model that flagged at-risk accounts 14 days before they cancelled.",
        ],
      },
    ],
    results: [
      { value: "↑ 3.4×", label: "Organic pipeline in 90 days" },
      { value: "8% → 21%", label: "Trial-to-paid conversion" },
      { value: "↓ 61%", label: "CAC over 6 months" },
      { value: "24", label: "Experiments run" },
    ],
    testimonial: {
      quote: "The site they built ranks on page one for every target keyword. The SEO architecture was invisible to users but incredibly effective for growth.",
      author: "Lena Müller",
      role: "Marketing Director, Stratum",
    },
    nextSlug: "stratum-web-platform",
  },
  {
    slug: "stratum-web-platform",
    client: "Stratum",
    service: "Web Development",
    serviceSlug: "web-development",
    year: "2025",
    duration: "8 weeks",
    role: "Frontend Engineering · Motion · SEO",
    accentColor: "#06b6d4",
    coverImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop", caption: "Homepage experience" },
      { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop", caption: "Editorial layout" },
      { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop", caption: "Mobile experience" },
    ],
    overview: "Stratum needed a marketing site that matched the ambition of their product — a platform for enterprise infrastructure teams. The brief was simple: build something that makes engineers stop scrolling. We delivered a 100 Lighthouse score, sub-second load times, and scroll choreography that earned Stratum three design awards.",
    sections: [
      {
        label: "The Challenge",
        heading: "Engineering credibility through design",
        body: [
          "Stratum's audience is infrastructure engineers — people who are deeply sceptical of marketing and immediately notice when a site is slow or poorly built. The site had to be technically excellent to be credible.",
          "The previous site scored 34 on Lighthouse and took 5.8 seconds to load. It was built on a page builder that made every performance optimisation a fight against the tool.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Performance as the design brief",
        body: [
          "We rebuilt on Next.js App Router with a strict performance budget: 100 Lighthouse, sub-1s LCP, zero layout shift. Every design decision was evaluated against these constraints — font loading strategy, image formats, animation triggers, third-party scripts.",
          "The motion system was built with GSAP ScrollTrigger — scroll-driven animations that reveal content as users move through the page. Every animation is tied to scroll position rather than time, so it works correctly regardless of scroll speed or device.",
        ],
      },
      {
        label: "The Solution",
        heading: "A site that earns its audience",
        body: [
          "The final site loads the critical path in 680ms on a 4G connection. The Lighthouse score is 100 across all four categories. The scroll choreography uses 40 distinct animation sequences that make the page feel like a product demo rather than a brochure.",
          "We built a custom CMS integration with Sanity that lets the Stratum marketing team update content without touching code. The editorial system supports rich text, code blocks, and embedded demos — everything their technical audience expects.",
        ],
      },
    ],
    results: [
      { value: "100", label: "Lighthouse score" },
      { value: "680ms", label: "LCP on 4G" },
      { value: "↑ 3×", label: "Time on site" },
      { value: "↑ 28%", label: "Organic traffic in 60 days" },
    ],
    nextSlug: "luma-retail-experience",
  },
  {
    slug: "luma-retail-experience",
    client: "Luma Retail",
    service: "Growth & Optimisation",
    serviceSlug: "growth-marketing",
    year: "2025",
    duration: "10 weeks",
    role: "UX · Frontend · CRO",
    accentColor: "#ef4444",
    coverImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop", caption: "Product experience" },
      { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop", caption: "Mobile checkout" },
      { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop", caption: "Conversion flow" },
    ],
    overview: "Luma's e-commerce experience was beautiful but broken. High bounce rates on product pages, a checkout that lost 52% of users at the payment step, and a mobile experience that felt like an afterthought. We rebuilt the conversion infrastructure and redesigned the critical path from product discovery to purchase.",
    sections: [
      {
        label: "The Challenge",
        heading: "Beautiful but not converting",
        body: [
          "Luma had invested heavily in brand and photography — the site looked premium. But the conversion rate was 1.1%, well below the 2.8% industry average for their category. The checkout was losing more than half its users at the payment step.",
          "Mobile was the biggest problem: 73% of traffic was mobile, but mobile converted at 0.6%. The mobile experience had been designed as a scaled-down version of desktop rather than a native mobile experience.",
        ],
      },
      {
        label: "Our Approach",
        heading: "Follow the money, fix the friction",
        body: [
          "We started with a full funnel audit using session recordings, heatmaps, and exit surveys. The data pointed to three specific friction points: product page load time (3.8s on mobile), a confusing size selection UX, and a checkout form that asked for too much information too early.",
          "We ran five A/B tests in the first three weeks — each targeting one specific friction point with a clear hypothesis and measurable success metric.",
        ],
      },
      {
        label: "The Solution",
        heading: "A checkout that gets out of the way",
        body: [
          "The new product pages load in under 1s on mobile. We rebuilt the size selection with a visual guide that reduced size-related returns by 31%. The checkout was redesigned as a three-step flow with guest checkout as the default — no account creation required.",
          "We added Apple Pay and Google Pay as primary payment options, reducing the payment step from 12 fields to a single tap for 60% of mobile users. The result was a 2.8× improvement in mobile conversion.",
        ],
      },
    ],
    results: [
      { value: "1.1% → 3.4%", label: "Overall conversion rate" },
      { value: "↑ 2.8×", label: "Mobile conversion" },
      { value: "↓ 31%", label: "Size-related returns" },
      { value: "↑ 44%", label: "Revenue per visitor" },
    ],
    nextSlug: "prism-brand-identity",
  },
];
