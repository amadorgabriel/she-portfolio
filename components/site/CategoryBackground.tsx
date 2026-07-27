import Image from "next/image";
import type { SanityImage } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";

interface CategoryBackgroundProps {
  image?: SanityImage | null;
}

/** Full-bleed category art behind page content — no overlay. */
export function CategoryBackground({ image }: CategoryBackgroundProps) {
  if (!image?.asset) return null;

  const src = imageUrlFromSanity(image, { width: 2400, quality: 85 });

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
