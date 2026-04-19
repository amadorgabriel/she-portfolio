import type { Metadata } from "next";
import { getAbout, getProjectsTimeline, getSiteConfig } from "@/lib/cms";
import { AboutRetroClient } from "@/components/pages/AboutRetroClient";
import { portableTextToPlain } from "@/lib/portable-plain";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { getSiteBaseUrl } from "@/lib/site-url";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [about, siteConfig] = await Promise.all([getAbout(), getSiteConfig()]);
  const title = about ? `Sobre ${about.nickname || about.name}` : "Sobre";
  const description =
    portableTextToPlain(about?.bio).trim() ||
    siteConfig?.metaDescription?.trim() ||
    "Perfil retrô, skills estilo stats de jogo e timeline de projetos.";
  const base = getSiteBaseUrl();
  const og = about?.profileImage
    ? imageUrlFromSanity(about.profileImage, { width: 1200, height: 1200 })
    : siteConfig?.ogImage
      ? imageUrlFromSanity(siteConfig.ogImage, { width: 1200, height: 630 })
      : undefined;

  return {
    title,
    description,
    alternates: base ? { canonical: `${base}/sobre` } : undefined,
    openGraph: {
      title,
      description,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function SobrePage() {
  const [about, timeline, siteConfig] = await Promise.all([
    getAbout(),
    getProjectsTimeline(),
    getSiteConfig(),
  ]);

  if (!about) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="font-[family-name:var(--font-vt323)] text-lg text-night-purple">
          Ainda não há documento <strong className="text-pink-2000">Sobre</strong> no Sanity. Crie um em Studio →
          Sobre (Perfil MySpace).
        </p>
      </div>
    );
  }

  return <AboutRetroClient about={about} timeline={timeline} siteConfig={siteConfig} />;
}
