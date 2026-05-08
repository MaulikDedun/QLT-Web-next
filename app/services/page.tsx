import Link from "next/link";
import Image from "next/image";

const items = [
  { label: "SaaS Development", slug: "saas-development" },
  { label: "Web Development", slug: "web-development" },
  { label: "UI/UX Design", slug: "ui-ux-design" },
  { label: "Growth & Marketing", slug: "growth-marketing" },
];

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden bg-[#070a12] px-6 pt-28 pb-16 text-white md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-14"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/55 via-[#070a12]/78 to-[#070a12]/92" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Services</p>
        <h1 className="mt-4 text-5xl leading-[0.95] font-semibold md:text-7xl">Immersive product services.</h1>
        <p className="mt-5 max-w-2xl text-sm text-white/70 md:text-base">
          Select a service to explore the direction, systems thinking, and implementation focus.
        </p>

        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group block rounded-2xl border border-white/15 bg-white/4 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/8"
              data-cursor="Explore"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl">{item.label}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/20 text-white/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-cyan-200/60 group-hover:bg-cyan-300/15 group-hover:text-cyan-100">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
