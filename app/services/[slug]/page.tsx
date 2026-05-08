import Link from "next/link";

type ServicePageProps = { params: Promise<{ slug: string }> };

const map: Record<string, string> = {
  "saas-development": "SaaS Development",
  "web-development": "Web Development",
  "ui-ux-design": "UI/UX Design",
  "growth-marketing": "Growth & Marketing",
};

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const title = map[slug] ?? "Service";

  return (
    <main className="px-6 pt-28 pb-16 md:px-12">
      <section className="mx-auto max-w-6xl">
        <Link href="/services" className="text-hover-link text-sm text-[#6b6b6b]">
          Back to Services
        </Link>
        <h1 className="mt-4 text-5xl font-semibold md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-[#6b6b6b]">
          Cinematic service storytelling page with sections for about, benefits, process, case studies, results, and FAQ.
        </p>
      </section>
    </main>
  );
}
