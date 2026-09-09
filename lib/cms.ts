import { cache } from "react";
import { client, isSanityConfigured } from "@/sanity/client";
import type {
  Category,
  Project,
  ProjectCardData,
  SiteConfig,
  QueryOptions,
} from "@/types/sanity";

const DEFAULT_REVALIDATE = 60;

interface SanityFetchOptions {
  cache?: "no-store";
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

function getFetchOptions(options?: QueryOptions): SanityFetchOptions {
  const revalidate = options?.revalidate ?? DEFAULT_REVALIDATE;

  if (revalidate === false) {
    return { cache: "no-store" };
  }

  return {
    next: {
      revalidate,
      tags: options?.tags,
    },
  };
}

const categoryFields = `
  _id,
  _type,
  title,
  slug,
  order,
  backgroundImage {
    _type,
    asset->,
    hotspot,
    crop
  }
`;

const projectFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  categories[]->{
    ${categoryFields}
  },
  thumbnail {
    ...,
    asset->
  },
  gallery[] {
    _type,
    _key,
    alt,
    caption,
    hotspot,
    crop,
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    },
    file {
      _type,
      asset->{
        url,
        mimeType,
        size
      }
    },
    poster {
      ...,
      asset->
    }
  },
  description,
  year,
  client,
  order
`;

const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  year,
  thumbnail {
    ...,
    asset->
  }
`;

const siteConfigFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  siteTitle,
  brandName,
  metaDescription,
  ctaLabel,
  socialLinks,
  splashLogo {
    ...,
    asset->
  },
  favicon {
    ...,
    asset->
  },
  ogImage {
    ...,
    asset->
  }
`;

/** Fallback tipado quando Sanity está off ou vazio. */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  _id: "fallback",
  _type: "siteConfig",
  siteTitle: "Karina Reis",
  brandName: "Karina Reis",
  ctaLabel: "ABRIR",
  metaDescription: "Portfólio de Karina Reis",
  socialLinks: {},
};

/**
 * Configuração do site (splash, marca, sociais).
 */
export const getSiteConfig = cache(async (options?: QueryOptions): Promise<SiteConfig | null> => {
  if (!isSanityConfigured()) return null;
  const query = `*[_type == "siteConfig"][0] { ${siteConfigFields} }`;
  return client.fetch(query, {}, getFetchOptions(options));
});

/**
 * Categorias ordenadas para o menu.
 */
export const getCategories = cache(async (options?: QueryOptions): Promise<Category[]> => {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "category"] | order(order asc, title asc) { ${categoryFields} }`;
  return client.fetch(query, {}, getFetchOptions(options));
});

/**
 * Categoria por slug.
 */
export const getCategoryBySlug = cache(
  async (slug: string, options?: QueryOptions): Promise<Category | null> => {
    if (!isSanityConfigured()) return null;
    const query = `*[_type == "category" && slug.current == $slug][0] { ${categoryFields} }`;
    return client.fetch(query, { slug }, getFetchOptions(options));
  }
);

/**
 * Projetos de uma categoria (por slug da categoria).
 */
export const getProjectsByCategorySlug = cache(
  async (slug: string, options?: QueryOptions): Promise<ProjectCardData[]> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project" && references(*[_type == "category" && slug.current == $slug]._id)] | order(order asc, year desc) { ${projectCardFields} }`;
    return client.fetch(query, { slug }, getFetchOptions(options));
  }
);

/**
 * Projeto completo por slug.
 */
export const getProjectBySlug = cache(
  async (slug: string, options?: QueryOptions): Promise<Project | null> => {
    if (!isSanityConfigured()) return null;
    const query = `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`;
    return client.fetch(query, { slug }, getFetchOptions(options));
  }
);

/**
 * Slugs de categorias (sitemap / generateStaticParams).
 */
export const getAllCategorySlugs = cache(async (options?: QueryOptions): Promise<string[]> => {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "category" && defined(slug.current)] | order(order asc) { "slug": slug.current }`;
  const rows = await client.fetch<Array<{ slug: string }>>(query, {}, getFetchOptions(options));
  return rows.map((r) => r.slug).filter(Boolean);
});

/**
 * Slugs de projetos (sitemap / generateStaticParams).
 */
export const getAllProjectSlugs = cache(async (options?: QueryOptions): Promise<string[]> => {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "project" && defined(slug.current)] | order(order asc, year desc) { "slug": slug.current }`;
  const rows = await client.fetch<Array<{ slug: string }>>(query, {}, getFetchOptions(options));
  return rows.map((r) => r.slug).filter(Boolean);
});
