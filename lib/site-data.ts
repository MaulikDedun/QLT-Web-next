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
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    previewGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3FvZGJwdjlkMzk5a2tyaWoxd3JvbmUzdmxqc3VqMG8xdm0yb2xqZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13HgwGsXF0aiGY/giphy.gif",
  },
  {
    title: "UI/UX Systems",
    slug: "ui-ux-design",
    note: "Human-centered digital interface systems",
    previewImageUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    previewGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3FvZGJwdjlkMzk5a2tyaWoxd3JvbmUzdmxqc3VqMG8xdm0yb2xqZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l41YtZOb9EUABnuqA/giphy.gif",
  },
  {
    title: "Web Development",
    slug: "web-development",
    note: "High-performance engineering architecture",
    previewImageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    previewGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3FvZGJwdjlkMzk5a2tyaWoxd3JvbmUzdmxqc3VqMG8xdm0yb2xqZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/coxQHKASG60HrHtvkt/giphy.gif",
  },
  {
    title: "Growth & Optimization",
    slug: "growth-marketing",
    note: "Experimentation and scale loops",
    previewImageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    previewGifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3FvZGJwdjlkMzk5a2tyaWoxd3JvbmUzdmxqc3VqMG8xdm0yb2xqZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kH1DBkPNyZPOk0BxrM/giphy.gif",
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
    description: "Turn ambiguity into a clear product narrative and measurable outcomes.",
    bullets: ["Stakeholder mapping and goals", "Experience audits and heuristics", "Success metrics + scope"],
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
    bullets: ["Incremental implementation", "Accessibility and performance budgets", "Automation for quality + velocity"],
  },
  {
    title: "Launch",
    description: "Deploy with confidence and make onboarding feel effortless.",
    bullets: ["Release planning and rollbacks", "Analytics instrumentation", "Docs and handoff playbooks"],
  },
  {
    title: "Scale",
    description: "Evolve the product with iteration loops that compound.",
    bullets: ["Continuous UX improvements", "Component growth + refactors", "Experimentation + conversion tuning"],
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
