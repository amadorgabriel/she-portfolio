import type { Project, ProjectCardData, SiteConfig } from "@/types/sanity";
import { absoluteUrl } from "@/lib/site-url";

export type BreadcrumbCrumb = { name: string; path: string };

function omitEmpty<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        v !== undefined &&
        v !== "" &&
        !(Array.isArray(v) && v.length === 0)
    )
  ) as T;
}

export function personId(base: string): string {
  return `${base}/#person`;
}

export function websiteId(base: string): string {
  return `${base}/#website`;
}

export function buildPersonNode(
  site: SiteConfig,
  base: string,
  imageUrl?: string
): Record<string, unknown> {
  const name = site.brandName || site.siteTitle || "Karina Reis";
  const sameAs: string[] = [];
  if (site.socialLinks?.instagram) sameAs.push(site.socialLinks.instagram);
  if (site.socialLinks?.linkedin) sameAs.push(site.socialLinks.linkedin);

  return omitEmpty({
    "@type": "Person",
    "@id": personId(base),
    name,
    description: site.metaDescription,
    image: imageUrl,
    url: base,
    email: site.socialLinks?.email,
    sameAs: sameAs.length ? sameAs : undefined,
    jobTitle: "Designer e direção criativa",
  });
}

export function buildWebSiteNode(
  site: SiteConfig,
  base: string
): Record<string, unknown> {
  const name = site.siteTitle || site.brandName || "Karina Reis";
  return omitEmpty({
    "@type": "WebSite",
    "@id": websiteId(base),
    name,
    url: base,
    description: site.metaDescription,
    inLanguage: "pt-BR",
    publisher: { "@id": personId(base) },
  });
}

export function buildSiteGraphSchema(
  site: SiteConfig,
  base: string,
  personImageUrl?: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteNode(site, base),
      buildPersonNode(site, base, personImageUrl),
    ],
  };
}

export function buildBreadcrumbSchema(
  crumbs: BreadcrumbCrumb[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) =>
      omitEmpty({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })
    ),
  };
}

export function buildCreativeWorkSchema(
  project: Project,
  description: string,
  imageUrl: string | undefined,
  site: SiteConfig,
  base: string
): Record<string, unknown> {
  const slug = project.slug.current;
  const category = project.categories?.[0]?.title;
  const creatorName = site.brandName || site.siteTitle || "Karina Reis";

  return omitEmpty({
    "@type": "CreativeWork",
    name: project.title,
    description,
    url: absoluteUrl(`/projeto/${slug}`),
    image: imageUrl,
    dateCreated: project._createdAt,
    dateModified: project._updatedAt ?? project._createdAt,
    creator: {
      "@type": "Person",
      "@id": personId(base),
      name: creatorName,
    },
    ...(category ? { genre: category } : {}),
    ...(project.client ? { contributor: { "@type": "Organization", name: project.client } } : {}),
  });
}

export function buildItemListSchema(
  categoryTitle: string,
  projects: ProjectCardData[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    name: categoryTitle,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) =>
      omitEmpty({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: absoluteUrl(`/projeto/${project.slug}`),
      })
    ),
  };
}

export function mergeGraphSchema(
  ...nodes: Record<string, unknown>[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
