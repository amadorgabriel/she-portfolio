import type { PortableTextBlock } from "@portabletext/types";

// ============== TIPOS BASE ==============

export interface SanityAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImage {
  _type: "image";
  _key?: string;
  asset: SanityAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

export interface SanityFile {
  _type: "file";
  asset: SanityAsset;
}

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export interface SanityReference {
  _type: "reference";
  _ref: string;
}

// ============== CATEGORY ==============

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
  order: number;
  description?: string;
}

// ============== PROJECT ==============

export interface Project {
  _id: string;
  _type: "project";
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  categories: Category[];
  thumbnail: SanityImage;
  gallery?: SanityImage[];
  description: PortableTextBlock[];
  year: number;
  client?: string;
  materials?: string[];
  team?: string[];
  tools?: string[];
  order: number;
  publishedAt?: string;
}

export interface ProjectCardData {
  _id: string;
  title: string;
  slug: string;
  year: number;
  thumbnail: SanityImage;
  categories?: string[];
}

// ============== SITE CONFIG (v2) ==============

export interface SiteSocialLinks {
  linkedin?: string;
  instagram?: string;
  email?: string;
}

export interface SiteAnalytics {
  googleAnalyticsId?: string;
}

export interface SiteConfig {
  _id: string;
  _type: "siteConfig";
  _createdAt?: string;
  _updatedAt?: string;
  siteTitle: string;
  brandName: string;
  metaDescription?: string;
  splashLogo?: SanityImage;
  ctaLabel: string;
  socialLinks?: SiteSocialLinks;
  favicon?: SanityImage;
  ogImage?: SanityImage;
  analytics?: SiteAnalytics;
}

/** Alias explícito do modelo v2 (design). */
export type SiteConfigV2 = SiteConfig;

// ============== UTILITÁRIOS ==============

export interface QueryOptions {
  revalidate?: number | false;
  tags?: string[];
}
