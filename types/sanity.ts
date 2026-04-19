import type { PortableTextBlock } from "@portabletext/types";

// ============== TIPOS BASE ==============

export interface SanityAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImage {
  _type: "image";
  _key?: string; // Para imagens em arrays
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

// ============== PROJECT ==============

export interface Project {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  category: string[];
  thumbnail: SanityImage;
  gallery?: SanityImage[];
  description: PortableTextBlock[];
  year: number;
  client?: string;
  materials?: string[];
  team?: string[];
  tools?: string[];
  isFeatured: boolean;
  order: number;
  publishedAt: string;
}

export interface ProjectCardData {
  _id: string;
  title: string;
  slug: string;
  category: string[];
  thumbnail: SanityImage;
  year: number;
  isFeatured: boolean;
}

// ============== ABOUT ==============

export interface InterestItem {
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: "instagram" | "linkedin" | "behance" | "pinterest" | "youtube" | "tiktok" | "email" | "website";
  url: string;
  label?: string;
}

export interface Top8Item {
  name: string;
  image?: SanityImage;
  url?: string;
  description?: string;
}

export interface About {
  _id: string;
  _type: "about";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  nickname?: string;
  bio: PortableTextBlock[];
  profileImage: SanityImage;
  skills?: string[];
  interests?: InterestItem[];
  socialLinks?: SocialLink[];
  top8?: Top8Item[];
  resumeFile?: SanityFile;
  playlistUrl?: string;
}

// ============== CONTACT ==============

export type AvailabilityStatus = "available" | "busy" | "unavailable";

export interface Contact {
  _id: string;
  _type: "contact";
  _createdAt: string;
  _updatedAt: string;
  email: string;
  instagram?: string;
  linkedin?: string;
  behance?: string;
  pinterest?: string;
  whatsapp?: string;
  location?: string;
  availability: AvailabilityStatus;
  responseTime: string;
}

// ============== SITE CONFIG ==============

export interface ThemeColors {
  primary?: { hex: string };
  secondary?: { hex: string };
  accent?: { hex: string };
}

export interface SiteFeatures {
  enableSounds: boolean;
  enableCustomCursor: boolean;
  showFavorites: boolean;
}

export interface SiteAnalytics {
  googleAnalyticsId?: string;
}

export interface SiteConfig {
  _id: string;
  _type: "siteConfig";
  _createdAt: string;
  _updatedAt: string;
  siteTitle: string;
  tagline: string;
  metaDescription?: string;
  footerText: string;
  favicon?: SanityImage;
  ogImage?: SanityImage;
  themeColors?: ThemeColors;
  features?: SiteFeatures;
  analytics?: SiteAnalytics;
}

// ============== UTILITÁRIOS ==============

export interface QueryOptions {
  revalidate?: number | false; // Segundos para ISR, false para no-store
  tags?: string[]; // Tags para cache
}

export type ProjectCategory = "coleção" | "ilustração" | "styling" | "collage" | "making of";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  coleção: "Coleção",
  ilustração: "Ilustração",
  styling: "Styling",
  collage: "Collage",
  "making of": "Making Of",
};

export const SOCIAL_ICONS: Record<SocialLink["platform"], string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  behance: "Behance",
  pinterest: "Pinterest",
  youtube: "YouTube",
  tiktok: "TikTok",
  email: "Email",
  website: "Website",
};

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  available: "Disponível para projetos",
  busy: "Ocupado (lista de espera)",
  unavailable: "Não disponível",
};
