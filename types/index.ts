// Tipos para o portfólio Y2K

export interface Project {
  id: string;
  title: string;
  year: number;
  category: string[];
  tags: string[];
  client?: string;
  materials?: string[];
  team?: string[];
  description: string;
  images: ProjectImage[];
  videos?: VideoEmbed[];
  featured: boolean;
  mannequinLook?: MannequinLook;
}

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  alt: string;
}

export interface VideoEmbed {
  id: string;
  url: string;
  platform: "youtube" | "vimeo";
  title?: string;
}

export interface MannequinLook {
  top?: string;
  bottom?: string;
  shoes?: string;
  accessories?: string[];
  fullLook: string;
}

export interface DesignerProfile {
  name: string;
  bio: string;
  photo: string;
  cvUrl?: string;
  socialLinks: SocialLink[];
  top8: Top8Item[];
  interests: string[];
  playlistUrl?: string;
}

export interface SocialLink {
  platform: "instagram" | "linkedin" | "behance" | "email";
  url: string;
  label: string;
}

export interface Top8Item {
  id: string;
  name: string;
  image: string;
  url: string;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type CategoryTag =
  | "coleção"
  | "ilustração"
  | "styling"
  | "collage"
  | "making of";

export interface GalleryItem {
  id: string;
  projectId: string;
  thumbnail: string;
  title: string;
  polaroidCaption: string;
}
