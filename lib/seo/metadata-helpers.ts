import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";
import { resolveOgImageUrl } from "@/lib/seo/resolve-og-image";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path only, e.g. `/projeto/foo` */
  path: string;
  /** URL Sanity ou caminho relativo; omitir usa `/opengraph-image`. */
  ogImageUrl?: string | null;
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
  const resolvedImage = resolveOgImageUrl(ogImageUrl);
  const images = [
    { url: resolvedImage, width: 1200, height: 630, alt: title },
  ];

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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images[0]!.url],
    },
  };
}
