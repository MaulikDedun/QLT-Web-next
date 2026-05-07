export default function InsightsPage() {
  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">Insights</p>
        <h1 className="mt-4 text-5xl leading-[0.95] font-semibold md:text-7xl">Editorial ideas and deep dives.</h1>
      </section>
      <section className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {["Systems", "Motion", "Growth"].map((item) => (
          <article key={item} className="rounded-3xl border border-black/10 p-6">
            <p className="text-sm text-[#6b6b6b]">{item}</p>
            <h2 className="mt-4 text-2xl">How {item} drives modern product outcomes.</h2>
          </article>
        ))}
      </section>
    </main>
  );
}
