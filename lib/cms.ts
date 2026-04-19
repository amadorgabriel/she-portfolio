import { cache } from "react";
import { client, isSanityConfigured } from "@/sanity/client";
import type {
  Project,
  ProjectCardData,
  About,
  Contact,
  SiteConfig,
  QueryOptions,
} from "@/types/sanity";

// ============== CONFIGURAÇÃO DE CACHE ==============

const DEFAULT_REVALIDATE = 60; // 1 minuto para desenvolvimento

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

// ============== QUERIES GROQ ==============

const projectFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  category,
  thumbnail {
    ..., 
    asset->
  },
  gallery[] {
    ..., 
    asset->
  },
  description,
  year,
  client,
  materials,
  team,
  tools,
  isFeatured,
  order,
  publishedAt
`;

const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  thumbnail {
    ..., 
    asset->
  },
  year,
  isFeatured
`;

const aboutFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  name,
  nickname,
  bio,
  profileImage {
    ..., 
    asset->
  },
  skills,
  interests,
  socialLinks,
  top8[] {
    name,
    image {
      ..., 
      asset->
    },
    url,
    description
  },
  resumeFile {
    ..., 
    asset->
  },
  "resumeUrl": resumeFile.asset->url,
  playlistUrl
`;

const contactFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  email,
  instagram,
  linkedin,
  behance,
  pinterest,
  whatsapp,
  location,
  availability,
  responseTime
`;

const siteConfigFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  siteTitle,
  tagline,
  metaDescription,
  footerText,
  favicon {
    ..., 
    asset->
  },
  ogImage {
    ..., 
    asset->
  },
  themeColors,
  features,
  analytics
`;

// ============== FUNÇÕES DE FETCH ==============

/**
 * Busca todos os projetos
 */
export const getProjects = cache(async (options?: QueryOptions): Promise<Project[]> => {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "project"] | order(order asc, year desc) { ${projectFields} }`;
  return client.fetch(query, {}, getFetchOptions(options));
});

/**
 * Busca um projeto específico pelo slug
 */
export const getProjectBySlug = cache(
  async (slug: string, options?: QueryOptions): Promise<Project | null> => {
    if (!isSanityConfigured()) return null;
    const query = `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`;
    return client.fetch(query, { slug }, getFetchOptions(options));
  }
);

/**
 * Busca projetos em destaque (para o Manequim Central)
 */
export const getFeaturedProjects = cache(
  async (limit = 3, options?: QueryOptions): Promise<ProjectCardData[]> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project" && isFeatured == true] | order(order asc) [0...$limit] { ${projectCardFields} }`;
    return client.fetch(query, { limit }, getFetchOptions(options));
  }
);

/**
 * Busca projetos por categoria
 */
export const getProjectsByCategory = cache(
  async (category: string, options?: QueryOptions): Promise<ProjectCardData[]> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project" && $category in category] | order(order asc, year desc) { ${projectCardFields} }`;
    return client.fetch(query, { category }, getFetchOptions(options));
  }
);

/**
 * Busca projetos recentes (para previews/home)
 */
export const getRecentProjects = cache(
  async (limit = 6, options?: QueryOptions): Promise<ProjectCardData[]> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project"] | order(publishedAt desc) [0...$limit] { ${projectCardFields} }`;
    return client.fetch(query, { limit }, getFetchOptions(options));
  }
);

/**
 * Busca todas as categorias únicas usadas nos projetos
 */
export const getProjectCategories = cache(
  async (options?: QueryOptions): Promise<string[]> => {
    if (!isSanityConfigured()) return [];
    const query = `array::unique(*[_type == "project"].category[])`;
    return client.fetch(query, {}, getFetchOptions(options));
  }
);

/** Slugs ordenados (mesma ordem da listagem / vizinhos). */
export const getAllProjectSlugs = cache(async (options?: QueryOptions): Promise<string[]> => {
  if (!isSanityConfigured()) return [];
  const query = `*[_type == "project" && defined(slug.current)] | order(order asc, year desc) { "slug": slug.current }`;
  const rows = await client.fetch<Array<{ slug: string }>>(query, {}, getFetchOptions(options));
  return rows.map((r) => r.slug).filter(Boolean);
});

/** Lista para navegação anterior/próximo. */
export const getProjectsNavList = cache(
  async (options?: QueryOptions): Promise<Array<{ slug: string; title: string }>> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project" && defined(slug.current)] | order(order asc, year desc) { "slug": slug.current, title }`;
    return client.fetch(query, {}, getFetchOptions(options));
  }
);

/** Timeline leve (currículo visual) a partir dos projetos. */
export const getProjectsTimeline = cache(
  async (options?: QueryOptions): Promise<Array<{ year: number; title: string; slug: string }>> => {
    if (!isSanityConfigured()) return [];
    const query = `*[_type == "project" && defined(slug.current)] | order(year desc) { year, title, "slug": slug.current }`;
    return client.fetch(query, {}, getFetchOptions(options));
  }
);

/**
 * Busca dados do About (Perfil MySpace)
 */
export const getAbout = cache(async (options?: QueryOptions): Promise<About | null> => {
  if (!isSanityConfigured()) return null;
  const query = `*[_type == "about"][0] { ${aboutFields} }`;
  return client.fetch(query, {}, getFetchOptions(options));
});

/**
 * Busca dados de Contato
 */
export const getContact = cache(async (options?: QueryOptions): Promise<Contact | null> => {
  if (!isSanityConfigured()) return null;
  const query = `*[_type == "contact"][0] { ${contactFields} }`;
  return client.fetch(query, {}, getFetchOptions(options));
});

/**
 * Busca configurações do site
 */
export const getSiteConfig = cache(async (options?: QueryOptions): Promise<SiteConfig | null> => {
  if (!isSanityConfigured()) return null;
  const query = `*[_type == "siteConfig"][0] { ${siteConfigFields} }`;
  return client.fetch(query, {}, getFetchOptions(options));
});

/**
 * Busca múltiplos dados de uma vez (para a página inicial)
 */
export const getHomePageData = cache(
  async (options?: QueryOptions) => {
    const [featuredProjects, recentProjects, siteConfig, about] = await Promise.all([
      getFeaturedProjects(3, options),
      getRecentProjects(6, options),
      getSiteConfig(options),
      getAbout(options),
    ]);

    return {
      featuredProjects,
      recentProjects,
      siteConfig,
      about,
    };
  }
);

/**
 * Busca dados completos para a página de portfólio
 */
export const getPortfolioData = cache(async (options?: QueryOptions) => {
  const [projects, categories, siteConfig] = await Promise.all([
    getProjects(options),
    getProjectCategories(options),
    getSiteConfig(options),
  ]);

  return {
    projects,
    categories,
    siteConfig,
  };
});

/**
 * Busca dados para a página de contato
 */
export const getContactPageData = cache(async (options?: QueryOptions) => {
  const [contact, siteConfig] = await Promise.all([
    getContact(options),
    getSiteConfig(options),
  ]);

  return {
    contact,
    siteConfig,
  };
});

// ============== UTILITÁRIOS DE CACHE ==============

/**
 * Revalida o cache de projetos
 * Chame esta função após atualizar projetos no CMS
 */
export async function revalidateProjects() {
  try {
    // Note: em ambiente Next.js App Router, use revalidateTag ou revalidatePath
    // Esta é uma função placeholder para documentação
    console.log("Revalidando cache de projetos...");
  } catch (error) {
    console.error("Erro ao revalidar cache:", error);
  }
}
