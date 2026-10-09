import { getSiteConfig, DEFAULT_SITE_CONFIG } from "@/lib/cms";
import { ogBrandName, ogTagline } from "@/lib/seo/og-copy";
import { OgDefaultHarness } from "./OgDefaultHarness";

type PageProps = {
  searchParams: Promise<{ v?: string }>;
};

export default async function OgDefaultPrototypePage({ searchParams }: PageProps) {
  const site = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const { v } = await searchParams;
  const parsed = parseInt(v ?? "1", 10);
  const initialIndex = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), 3) - 1
    : 0;

  return (
    <OgDefaultHarness
      brandName={ogBrandName(site)}
      tagline={ogTagline(site)}
      initialIndex={initialIndex}
    />
  );
}
