import type { Category, ProjectCardData, SiteConfig } from "@/types/sanity";
import { absoluteUrl, getSiteBaseUrl } from "@/lib/site-url";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  mergeGraphSchema,
} from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";

type CategoryPageJsonLdProps = {
  category: Category;
  projects: ProjectCardData[];
  site: SiteConfig;
};

export function CategoryPageJsonLd({
  category,
  projects,
  site,
}: CategoryPageJsonLdProps) {
  const base = getSiteBaseUrl();
  if (!base) return null;

  const slug = category.slug.current;
  const brand = site.siteTitle || site.brandName || "Karina Reis";

  const crumbs = [
    { name: brand, path: "/" },
    { name: category.title, path: `/categoria/${slug}` },
  ];

  const data = mergeGraphSchema(
    {
      "@type": "CollectionPage",
      name: category.title,
      url: absoluteUrl(`/categoria/${slug}`),
      inLanguage: "pt-BR",
      isPartOf: { "@type": "WebSite", url: base },
    },
    buildItemListSchema(category.title, projects),
    buildBreadcrumbSchema(crumbs)
  );

  return <JsonLd data={data} />;
}
