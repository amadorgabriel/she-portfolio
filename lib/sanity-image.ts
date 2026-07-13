import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/types/sanity";

export const PLACEHOLDER_IMAGE = "/placeholders/project.svg";

export function imageUrlFromSanity(
  image: SanityImage | undefined | null,
  opts: { width: number; height?: number; quality?: number } = { width: 800 }
): string {
  if (!image?.asset) return PLACEHOLDER_IMAGE;
  try {
    let b = urlFor(image).width(opts.width).quality(opts.quality ?? 82).format("webp");
    if (opts.height) b = b.height(opts.height).fit("crop");
    return b.url();
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}
