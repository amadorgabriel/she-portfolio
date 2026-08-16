import type { SanityImage } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";

interface CategoryBackgroundProps {
  image?: SanityImage | null;
}

/**
 * Full-bleed category art behind page content — no overlay.
 * CSS fixed background (not next/image) to reduce mobile scroll jitter (BGFIX / INV-02).
 */
export function CategoryBackground({ image }: CategoryBackgroundProps) {
  if (!image?.asset) return null;

  const src = imageUrlFromSanity(image, { width: 2400, quality: 85 });

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${src})`,
        backgroundAttachment: "fixed",
      }}
      aria-hidden
    />
  );
}
