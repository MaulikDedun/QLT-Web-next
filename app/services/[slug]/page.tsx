import { notFound } from "next/navigation";
import { servicePages, projects } from "@/lib/site-data";
import { ServiceDetailClient } from "./service-detail-client";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = servicePages.find((s) => s.slug === slug);
  if (!data) notFound();

  const relatedProjects = projects.filter((p) =>
    data.projectSlugs.includes(p.slug)
  );

  return <ServiceDetailClient data={data} projects={relatedProjects} />;
}
