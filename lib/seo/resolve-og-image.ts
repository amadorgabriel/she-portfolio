import { urlFor } from "@/sanity/client";
import type { SanityBackgroundImage, SanityImage } from "@/types/sanity";

/** Rota gerada por `app/opengraph-image.tsx` quando não há imagem no Sanity. */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

type OgImageSource = SanityImage | SanityBackgroundImage | null | undefined;

/**
 * JPEG 1200×630. WhatsApp e LinkedIn ignoram WebP no preview de link.
 */
export function sanityOgImageUrl(source: OgImageSource): string | undefined {
  if (!source?.asset) return undefined;
  try {
    return urlFor(source)
      .width(1200)
      .height(630)
      .fit("crop")
      .quality(80)
      .format("jpg")
      .url();
  } catch {
    return undefined;
  }
}

/** Primeira URL definida vence; caso contrário, imagem OG gerada localmente. */
export function resolveOgImageUrl(
  ...candidates: Array<string | undefined | null>
): string {
  for (const url of candidates) {
    if (url) return url;
  }
  return DEFAULT_OG_IMAGE_PATH;
}
