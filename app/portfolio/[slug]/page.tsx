import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/site-data";

type PortfolioCaseStudyProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioCaseStudyPage({ params }: PortfolioCaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <Link href="/portfolio" className="text-hover-link text-sm text-[#6b6b6b]">
          Back to Portfolio
        </Link>
        <h1 className="mt-5 max-w-4xl text-5xl leading-[0.95] font-semibold md:text-7xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-[#6b6b6b]">{project.summary}</p>
      </section>

      <section className="mx-auto mt-14 max-w-6xl space-y-6">
        {["Challenge", "Process", "Solution", "Result"].map((item) => (
          <article key={item} className="rounded-3xl border border-black/10 bg-[var(--bg-secondary)] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b]">{item}</p>
            <p className="mt-3 max-w-3xl text-lg">
              Cinematic storytelling block for {item.toLowerCase()} with motion-ready layout and premium editorial spacing.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
