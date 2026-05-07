export default function AboutPage() {
  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">About QuantaTechLabs</p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] font-semibold md:text-7xl">
          Product-first teams crafting scalable systems and cinematic experiences.
        </h1>
      </section>
      <section className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2">
        {[
          "Product-first thinking",
          "Human-centered systems",
          "Scalable architecture",
          "Experience-driven execution",
        ].map((item) => (
          <article key={item} className="rounded-3xl border border-black/10 bg-[#f3f3f3] p-8">
            <h2 className="text-2xl">{item}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
