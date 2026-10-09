import type { Metadata } from "next";
import {
  getSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "@/lib/cms";
import { SplashView } from "@/components/pages/SplashView";
import { CategoryBackground } from "@/components/site/CategoryBackground";
import { buildPageMetadata } from "@/lib/seo/metadata-helpers";
import { resolveOgImageUrl, sanityOgImageUrl } from "@/lib/seo/resolve-og-image";

export async function generateMetadata(): Promise<Metadata> {
  const config = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const title = config.siteTitle || config.brandName || "Karina Reis";
  const description =
    config.metaDescription || `Portfólio de ${config.brandName || "Karina Reis"}`;
  const ogImageUrl = resolveOgImageUrl(sanityOgImageUrl(config.ogImage));

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
