import type { Metadata } from "next";
import {
  getCategories,
  getSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "@/lib/cms";
import { SiteChrome } from "@/components/site/SiteChrome";
import { CategoryMenu } from "@/components/nav/CategoryMenu";
import { BackToTop } from "@/components/ui/BackToTop";
import { brandArtUrl } from "@/lib/sanity-image";

export async function generateMetadata(): Promise<Metadata> {
  const config = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const brand = config.brandName || "Karina Reis";
  return {
    title: "Menu",
    description: `Categorias do portfólio de ${brand}`,
  };
}

export default async function MenuPage() {
  const [config, categories] = await Promise.all([
    getSiteConfig(),
    getCategories(),
  ]);
  const site = config ?? DEFAULT_SITE_CONFIG;
  const logoUrl = site.splashLogo?.asset
    ? brandArtUrl(site.splashLogo, { width: 240 })
    : undefined;

  const items = categories.map((c) => ({
    title: c.title,
    slug: c.slug.current,
  }));

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteChrome brandName={site.brandName || "Karina Reis"} logoUrl={logoUrl} />
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
        <CategoryMenu categories={items} />
      </div>
      <BackToTop />
    </div>
  );
}
