import Link from "next/link";

const items = [
  { label: "SaaS Development", slug: "saas-development" },
  { label: "Web Development", slug: "web-development" },
  { label: "UI/UX Design", slug: "ui-ux-design" },
  { label: "Growth & Marketing", slug: "growth-marketing" },
];

export default function ServicesPage() {
  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Services</p>
        <h1 className="mt-4 text-5xl leading-[0.95] font-semibold md:text-7xl">Immersive product services.</h1>
        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group block rounded-2xl border border-black/10 p-6 transition-all hover:-translate-y-0.5 hover:bg-[#f3f3f3]"
            >
              <span className="text-2xl">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
