import type { Metadata } from "next";
import {
  getSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "@/lib/cms";
import { SplashView } from "@/components/pages/SplashView";
import { CategoryBackground } from "@/components/site/CategoryBackground";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { buildPageMetadata } from "@/lib/seo/metadata-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const config = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const title = config.siteTitle || config.brandName || "Karina Reis";
  const description =
    config.metaDescription || `Portfólio de ${config.brandName || "Karina Reis"}`;
  const ogImageUrl = config.ogImage
    ? imageUrlFromSanity(config.ogImage, { width: 1200, height: 630 })
    : undefined;

  return buildPageMetadata({
    title,
    description,
    path: "/",
    ogImageUrl,
  });
}

export default async function HomePage() {
  const config = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  return (
    <>
      <CategoryBackground image={config.backgroundImage} />
      <div className="relative z-10">
        <SplashView config={config} />
      </div>
    </>
  );
}
