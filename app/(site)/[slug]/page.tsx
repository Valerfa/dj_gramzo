import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { getSeoLanding, seoLandingSlugs } from "@/lib/seoLandingData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return seoLandingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getSeoLanding(slug);

  if (!landing) {
    return {};
  }

  return {
    title: `${landing.title} в Москве | GRAMZO`,
    description: landing.description,
    keywords: landing.keywords,
    alternates: {
      canonical: `/${landing.slug}`,
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = getSeoLanding(slug);

  if (!landing) {
    notFound();
  }

  return <SeoLandingPage landing={landing} />;
}
