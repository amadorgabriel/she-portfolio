import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path only, e.g. `/projeto/foo` */
  path: string;
  ogImageUrl?: string;
  ogType?: "website" | "article";
};

/** Shared Open Graph + Twitter + canonical for public routes. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImageUrl,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const images = ogImageUrl
    ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: "pt_BR",
      title,
      description,
      url,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}
