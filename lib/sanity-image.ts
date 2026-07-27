import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/types/sanity";

export const PLACEHOLDER_IMAGE = "/placeholders/project.svg";

type ImageAssetLike = {
  _ref?: string;
  mimeType?: string;
  extension?: string;
  url?: string;
};

/** Detect GIF from expanded asset (mime/extension/url) or Sanity asset `_ref` (`…-gif`). */
function isGifAsset(image: SanityImage): boolean {
  const asset = image.asset as ImageAssetLike | undefined;
  if (!asset) return false;
  if (asset.mimeType === "image/gif") return true;
  if (asset.extension?.toLowerCase() === "gif") return true;
  if (typeof asset.url === "string" && /\.gif(\?|$)/i.test(asset.url)) return true;
  // Unexpanded refs: `image-{id}-{WxH}-{ext}`
  if (typeof asset._ref === "string" && /-gif$/i.test(asset._ref)) return true;
  return false;
}

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

/**
 * URL for Marca / brand art (splash + header).
 * Skips `.format("webp")` for GIFs so animation is preserved; static images still get WebP.
 */
export function brandArtUrl(
  image: SanityImage | undefined | null,
  opts: { width: number; height?: number; quality?: number } = { width: 800 }
): string {
  if (!image?.asset) return PLACEHOLDER_IMAGE;
  try {
    const gif = isGifAsset(image);
    let b = urlFor(image).width(opts.width).quality(opts.quality ?? 82);
    if (!gif) b = b.format("webp");
    if (opts.height) b = b.height(opts.height).fit("crop");
    return b.url();
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}
