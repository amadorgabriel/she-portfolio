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

const galleryMediaFields = `
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
    _type == "galleryVideo" => {
      video {
        _type,
        asset->{
          playbackId,
          assetId,
          thumbTime,
          data {
            aspect_ratio
          }
        }
      }
    },
    poster {
      ...,
      asset->
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
  content[] {
    _type,
    _key,
    _type == "projectText" => {
      body
    },
    _type == "projectImage" => {
      alt,
      caption,
      image {
        ...,
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    _type == "projectVideo" => {
      alt,
      caption,
      video {
        _type,
        asset->{
          playbackId,
          assetId,
          thumbTime,
          data {
            aspect_ratio
          }
        }
      },
      poster {
        ...,
        asset->
      }
    },
    _type == "projectGallery" => {
      items[] {
        ${galleryMediaFields}
      }
    }
  },
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
  backgroundImage {
    _type,
    asset->,
    hotspot,
    crop
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
  const query = `*[_type == "category"] | order(select(defined(orderRank) => 0, 1) asc, orderRank asc, order asc, title asc) { ${categoryFields} }`;
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
    const query = `*[_type == "project" && references(*[_type == "category" && slug.current == $slug]._id)] | order(select(defined(orderRank) => 0, 1) asc, orderRank asc, order asc, year desc) { ${projectCardFields} }`;
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

export interface SitemapEntry {
  slug: string;
  lastModified?: string;
}

/**
 * Slugs de categorias (sitemap / generateStaticParams).
 */
export const getAllCategorySlugs = cache(async (options?: QueryOptions): Promise<string[]> => {
  const rows = await getCategorySitemapEntries(options);
  return rows.map((r) => r.slug);
});

/**
 * Slugs de projetos (sitemap / generateStaticParams).
 */
export const getAllProjectSlugs = cache(async (options?: QueryOptions): Promise<string[]> => {
  const rows = await getProjectSitemapEntries(options);
  return rows.map((r) => r.slug);
});

/** Categorias com data de atualização para sitemap.xml */
export const getCategorySitemapEntries = cache(
  async (options?: QueryOptions): Promise<SitemapEntry[]> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "category" && defined(slug.current)] | order(select(defined(orderRank) => 0, 1) asc, orderRank asc, order asc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    }`;
    const rows = await client.fetch<SitemapEntry[]>(query, {}, getFetchOptions(options));
    return rows.filter((r) => Boolean(r.slug));
  }
);

/** Projetos com data de atualização para sitemap.xml */
export const getProjectSitemapEntries = cache(
  async (options?: QueryOptions): Promise<SitemapEntry[]> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project" && defined(slug.current)] | order(select(defined(orderRank) => 0, 1) asc, orderRank asc, order asc, year desc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    }`;
    const rows = await client.fetch<SitemapEntry[]>(query, {}, getFetchOptions(options));
    return rows.filter((r) => Boolean(r.slug));
  }
);
