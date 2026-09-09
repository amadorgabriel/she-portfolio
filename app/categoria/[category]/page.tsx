import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getProjectsByCategorySlug,
  getSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "@/lib/cms";
import { SiteChrome } from "@/components/site/SiteChrome";
import { CategoryBackground } from "@/components/site/CategoryBackground";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { BackToTop } from "@/components/ui/BackToTop";
import { brandArtUrl } from "@/lib/sanity-image";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const [category, config] = await Promise.all([
    getCategoryBySlug(slug),
    getSiteConfig(),
  ]);
  if (!category) return { title: "Categoria" };
  const site = config ?? DEFAULT_SITE_CONFIG;
  return {
    title: category.title,
    description:
      site.metaDescription || `Portfólio de ${site.brandName || "Karina Reis"}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const [category, projects, config] = await Promise.all([
    getCategoryBySlug(slug),
    getProjectsByCategorySlug(slug),
    getSiteConfig(),
  ]);

  if (!category) notFound();

  const site = config ?? DEFAULT_SITE_CONFIG;
  const logoUrl = site.splashLogo?.asset
    ? brandArtUrl(site.splashLogo, { width: 240 })
    : undefined;

  return (
    <>
      <CategoryBackground image={category.backgroundImage} />
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <SiteChrome brandName={site.brandName || "Karina Reis"} logoUrl={logoUrl} />
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 pb-8 md:px-10">
          <h1 className="font-display mb-10 text-4xl uppercase tracking-[0.06em] md:mb-14 md:text-5xl">
            {category.title}
          </h1>
          <ProjectGrid projects={projects} />
        </div>
        <BackToTop />
      </div>
    </>
  );
}
