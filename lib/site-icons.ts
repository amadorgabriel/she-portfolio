import type { Metadata } from "next";
import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/types/sanity";

/** Favicon URL from Sanity without forcing WebP (png/ico/svg stay usable). */
export function faviconUrlFromSanity(
  image: SanityImage | undefined | null
): string | null {
  if (!image?.asset) return null;
  try {
    return urlFor(image).width(64).url();
  } catch {
    return null;
  }
}

const DEFAULT_ICONS: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico" },
    { url: "/icon.png", type: "image/png" },
  ],
  apple: [{ url: "/apple-icon.png" }],
};

/** Prefer Sanity favicon when present; otherwise static public icons. */
export function resolveSiteIcons(
  favicon: SanityImage | undefined | null
): NonNullable<Metadata["icons"]> {
  const url = faviconUrlFromSanity(favicon);
  if (!url) return DEFAULT_ICONS;
  return {
    icon: [{ url }],
    apple: [{ url }],
  };
}
