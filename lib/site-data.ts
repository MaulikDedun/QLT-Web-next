export type ServiceItem = {
  title: string;
  slug: string;
  note: string;
};

export type ProjectItem = {
  title: string;
  slug: string;
  summary: string;
};

export const services: ServiceItem[] = [
  { title: "SaaS Platforms", slug: "saas-development", note: "Connected product ecosystems" },
  { title: "UI/UX Systems", slug: "ui-ux-design", note: "Human-centered digital interface systems" },
  { title: "Web Development", slug: "web-development", note: "High-performance engineering architecture" },
  { title: "Growth & Optimization", slug: "growth-marketing", note: "Experimentation and scale loops" },
];

export const projects: ProjectItem[] = [
  {
    title: "Axiom Finance Platform",
    slug: "axiom-finance-platform",
    summary: "Cinematic B2B finance workspace for modern teams.",
  },
  {
    title: "Nexora Health Dashboard",
    slug: "nexora-health-dashboard",
    summary: "Unified clinical operations dashboard with premium UX systems.",
  },
  {
    title: "Velocity Commerce Suite",
    slug: "velocity-commerce-suite",
    summary: "Conversion-driven commerce platform with modular frontend architecture.",
  },
  {
    title: "Helix AI Workspace",
    slug: "helix-ai-workspace",
    summary: "AI-assisted productivity environment with advanced motion interactions.",
  },
];
