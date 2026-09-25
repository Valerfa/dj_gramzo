import landingData from "@/content/seo-landings.json";

export type SeoContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type SeoLandingSection = {
  heading: string;
  blocks: SeoContentBlock[];
};

export type SeoLanding = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  intro: SeoContentBlock[];
  sections: SeoLandingSection[];
};

const landings = landingData as Record<string, SeoLanding>;

export const seoLandingSlugs = Object.keys(landings);

export function getSeoLanding(slug: string) {
  return landings[slug];
}
