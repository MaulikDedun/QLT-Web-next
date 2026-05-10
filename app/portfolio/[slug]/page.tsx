import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/site-data";
import { CaseStudyClient } from "./case-study-client";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function PortfolioCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const next = study.nextSlug
    ? caseStudies.find((c) => c.slug === study.nextSlug) ?? null
    : null;

  return <CaseStudyClient study={study} next={next} />;
}
