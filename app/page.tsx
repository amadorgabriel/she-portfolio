import type { Metadata } from "next";
import {
  getSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "@/lib/cms";
import { SplashView } from "@/components/pages/SplashView";
import { imageUrlFromSanity } from "@/lib/sanity-image";

export async function generateMetadata(): Promise<Metadata> {
  const config = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const title = config.siteTitle || config.brandName || "Karina Reis";
  const description =
    config.metaDescription || `Portfólio de ${config.brandName || "Karina Reis"}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(config.ogImage
        ? { images: [{ url: imageUrlFromSanity(config.ogImage, { width: 1200, height: 630 }) }] }
        : {}),
    },
  };
}

export default async function HomePage() {
  const config = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  return <SplashView config={config} />;
}
