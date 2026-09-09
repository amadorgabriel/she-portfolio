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
  /** Presente quando GROQ projeta `file.asset->url` (e campos irmãos). */
  url?: string;
  mimeType?: string;
  size?: number;
}

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export interface SanityReference {
  _type: "reference";
  _ref: string;
}

// ============== GALLERY MEDIA ==============

export interface SanityImageAssetMeta {
  _id?: string;
  _ref?: string;
  _type?: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio?: number;
    };
  };
  /** Alguns fetches expandem dimensões no próprio asset. */
  width?: number;
  height?: number;
}

export interface SanityGalleryImage extends SanityImage {
  _type: "image";
  alt: string;
  caption?: string;
  asset: SanityAsset & SanityImageAssetMeta;
}

export interface SanityGalleryVideo {
  _type: "galleryVideo";
  _key?: string;
  file: SanityFile & {
    asset?: SanityAsset & {
      url?: string;
      mimeType?: string;
      size?: number;
    };
  };
  alt: string;
  caption?: string;
  poster?: SanityImage;
}

export type GalleryMedia = SanityGalleryImage | SanityGalleryVideo;

// ============== CATEGORY ==============

/** Imagem de fundo decorativa (aria-hidden) — sem alt/caption por design (CLEAN-03). */
export type SanityBackgroundImage = Omit<SanityImage, "alt" | "caption">;

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
  order: number;
  backgroundImage?: SanityBackgroundImage;
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
  gallery?: GalleryMedia[];
  description: PortableTextBlock[];
  year: number;
  client?: string;
  order: number;
}

export interface ProjectCardData {
  _id: string;
  title: string;
  slug: string;
  year: number;
  thumbnail: SanityImage;
}

// ============== SITE CONFIG (v2) ==============

export interface SiteSocialLinks {
  linkedin?: string;
  instagram?: string;
  email?: string;
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
  /** Fundo decorativo da home/menu (DEC-005-03) — sem alt, mesmo modelo de categoria. */
  backgroundImage?: SanityBackgroundImage;
  ctaLabel: string;
  socialLinks?: SiteSocialLinks;
  favicon?: SanityImage;
  ogImage?: SanityImage;
}

/** Alias explícito do modelo v2 (design). */
export type SiteConfigV2 = SiteConfig;

// ============== UTILITÁRIOS ==============

export interface QueryOptions {
  revalidate?: number | false;
  tags?: string[];
}
