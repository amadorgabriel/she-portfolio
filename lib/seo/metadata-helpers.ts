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

function socialImageUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return absoluteUrl(url);
}

function socialImageType(url: string): string {
  if (url.includes("/opengraph-image") || /\.png(\?|$)/i.test(url)) return "image/png";
  return "image/jpeg";
}

/** Shared Open Graph + Twitter + canonical for public routes. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImageUrl,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = socialImageUrl(resolveOgImageUrl(ogImageUrl));
  const images = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title,
      type: socialImageType(imageUrl),
    },
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
