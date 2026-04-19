import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/cms";
import { ProjetosClosetClient } from "@/components/pages/ProjetosClosetClient";
import { getSiteBaseUrl } from "@/lib/site-url";
import { imageUrlFromSanity } from "@/lib/sanity-image";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getPortfolioData();
  const title = "Closet Virtual";
  const description =
    siteConfig?.metaDescription?.trim() ||
    "Coleções, ilustrações, styling e collages — navegue pelo closet como em um jogo de dress-up.";
  const base = getSiteBaseUrl();
  const og = siteConfig?.ogImage
    ? imageUrlFromSanity(siteConfig.ogImage, { width: 1200, height: 630 })
    : undefined;

  return {
    title,
    description,
    alternates: base ? { canonical: `${base}/projetos` } : undefined,
    openGraph: {
      title: `${title} | ${siteConfig?.siteTitle ?? "Portfólio"}`,
      description,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ProjetosPage() {
  const { projects } = await getPortfolioData();
  return <ProjetosClosetClient projects={projects} />;
}
