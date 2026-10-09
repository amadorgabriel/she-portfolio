import Image from "next/image";
import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/types/sanity";
import { cn } from "@/lib/utils";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";

const BODY_SIZES = "(max-width: 1024px) 100vw, 1024px";

interface ProjectBodyImageProps {
  image: SanityImage;
  alt: string;
  caption?: string;
  className?: string;
}

function imageAspectRatio(image: SanityImage): number {
  const asset = image.asset as { metadata?: { dimensions?: { width: number; height: number; aspectRatio?: number } }; width?: number; height?: number };
  const dims = asset?.metadata?.dimensions;
  if (dims?.aspectRatio && dims.aspectRatio > 0) return dims.aspectRatio;
  if (dims?.width && dims?.height && dims.height > 0) return dims.width / dims.height;
  if (asset?.width && asset?.height && asset.height > 0) return asset.width / asset.height;
  return 4 / 5;
}

function bodyImageUrl(image: SanityImage): string {
  return urlFor(image).width(1400).format("webp").url();
}

export function ProjectBodyImage({ image, alt, caption, className }: ProjectBodyImageProps) {
  if (!image?.asset?._ref && !(image.asset as { url?: string })?.url) return null;

  const ratio = imageAspectRatio(image);

  return (
    <figure className={cn("mb-12 w-full", className)}>
      <div
        className="relative w-full overflow-hidden bg-[var(--color-line)]"
        style={{ aspectRatio: String(ratio) }}
      >
        <Image
          src={bodyImageUrl(image)}
          alt={alt}
          fill
          sizes={BODY_SIZES}
          className="object-contain"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
