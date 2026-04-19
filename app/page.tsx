import type { Metadata } from "next";
import { getHomePageData, getSiteConfig } from "@/lib/cms";
import { HomeSalaVirtual } from "@/components/pages/HomeSalaVirtual";
import { isSanityConfigured } from "@/sanity/client";
import { imageUrlFromSanity } from "@/lib/sanity-image";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const title = siteConfig?.siteTitle ?? "Sala Virtual da Designer";
  const description =
    siteConfig?.metaDescription?.trim() ||
    siteConfig?.tagline ||
    "Portfólio de moda com estética Y2K — lookbook, styling e collages.";
  const og = siteConfig?.ogImage
    ? imageUrlFromSanity(siteConfig.ogImage, { width: 1200, height: 630 })
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: og ? [og] : undefined,
    },
  };
}

export default async function HomePage() {
  const { featuredProjects, siteConfig, about } = await getHomePageData();

  return (
    <HomeSalaVirtual
      featuredProjects={featuredProjects}
      siteConfig={siteConfig}
      about={about}
      sanityConfigured={isSanityConfigured()}
    />
  );
}
