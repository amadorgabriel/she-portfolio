import type { Project } from "@/types/sanity";
import type { SiteConfig } from "@/types/sanity";
import { getSiteBaseUrl } from "@/lib/site-url";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
  mergeGraphSchema,
} from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";

type ProjectPageJsonLdProps = {
  project: Project;
  description: string;
  site: SiteConfig;
};

export function ProjectPageJsonLd({
  project,
  description,
  site,
}: ProjectPageJsonLdProps) {
  const base = getSiteBaseUrl();
  if (!base) return null;

  const slug = project.slug.current;
  const category = project.categories?.[0];
  const imageUrl = project.thumbnail
    ? imageUrlFromSanity(project.thumbnail, { width: 1200, height: 630 })
    : undefined;
  const absoluteImage =
    imageUrl && !imageUrl.startsWith("http") ? `${base}${imageUrl}` : imageUrl;

  const crumbs = [
    { name: site.siteTitle || site.brandName || "Karina Reis", path: "/" },
    ...(category
      ? [{ name: category.title, path: `/categoria/${category.slug.current}` }]
      : []),
    { name: project.title, path: `/projeto/${slug}` },
  ];

  const data = mergeGraphSchema(
    buildCreativeWorkSchema(project, description, absoluteImage, site, base),
    buildBreadcrumbSchema(crumbs)
  );

  return <JsonLd data={data} />;
}
