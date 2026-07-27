import Link from "next/link";
import Image from "next/image";
import type { ProjectCardData } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";

interface ProjectCardEditorialProps {
  project: ProjectCardData;
}

export function ProjectCardEditorial({ project }: ProjectCardEditorialProps) {
  const { title, slug, year, thumbnail } = project;
  const src = imageUrlFromSanity(thumbnail, { width: 800, height: 1000 });

  return (
    <Link
      href={`/projeto/${slug}`}
      className="group block no-underline animate-fade-up"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-line)]">
        <Image
          src={src}
          alt={thumbnail?.alt || title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg tracking-tight md:text-xl">{title}</h3>
        <span className="shrink-0 text-sm text-[var(--color-muted)] tabular-nums">{year}</span>
      </div>
    </Link>
  );
}
