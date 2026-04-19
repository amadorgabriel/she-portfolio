"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GlitterText } from "@/components/ui/GlitterText";
import { DesktopWindow } from "@/components/ui/DesktopWindow";
import { RichText } from "@/components/RichText";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/types/sanity";
import { CATEGORY_LABELS, type ProjectCategory } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";
import { SparkleHoverSurface } from "@/components/interactive/SparkleHoverSurface";
import { Y2KBreadcrumbs } from "@/components/ui/NavigationDock";
import { cn } from "@/lib/utils";

function assetKey(img: SanityImage): string {
  const a = img.asset as { _ref?: string; _id?: string } | undefined;
  if (!a) return img._key ?? "";
  if (typeof a === "object" && "_ref" in a && a._ref) return a._ref;
  if (typeof a === "object" && "_id" in a && a._id) return a._id;
  return img._key ?? "";
}

function uniqueImages(thumbnail: SanityImage, gallery: SanityImage[] | undefined): SanityImage[] {
  const refs = new Set<string>();
  const out: SanityImage[] = [];
  const push = (img: SanityImage | undefined) => {
    if (!img?.asset) return;
    const key = assetKey(img);
    if (!key || refs.has(key)) return;
    refs.add(key);
    out.push(img);
  };
  push(thumbnail);
  for (const g of gallery ?? []) push(g);
  return out;
}

function tagLabel(cat: string): string {
  const k = cat as ProjectCategory;
  if (k in CATEGORY_LABELS) return CATEGORY_LABELS[k];
  return cat;
}

export type ProjectFittingRoomProps = {
  title: string;
  description: PortableTextBlock[];
  gallery: SanityImage[] | undefined;
  thumbnail: SanityImage;
  year: number;
  tools?: string[];
  category: string[];
  slug: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

export function ProjectFittingRoom({
  title,
  description,
  gallery,
  thumbnail,
  year,
  tools,
  category,
  slug,
  prev,
  next,
}: ProjectFittingRoomProps) {
  const images = useMemo(() => uniqueImages(thumbnail, gallery), [thumbnail, gallery]);
  const [active, setActive] = useState(0);
  const main = images[active] ?? thumbnail;
  const mainSrc = imageUrlFromSanity(main, { width: 1200, height: 1600, quality: 88 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Y2KBreadcrumbs
        className="mb-6"
        items={[
          { label: "Sala", href: "/" },
          { label: "Closet", href: "/projetos" },
          { label: title },
        ]}
      />

      <header className="mb-8">
        <GlitterText as="h1" size="lg" variant="pink" className="mb-2 block">
          {title}
        </GlitterText>
        <p className="font-[family-name:var(--font-vt323)] text-night-purple/80">Fitting Room · provador virtual</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Galeria */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:w-28 lg:flex-col lg:overflow-y-auto lg:pb-0">
            {images.map((img, i) => {
              const src = imageUrlFromSanity(img, { width: 200, height: 267 });
              return (
                <button
                  key={`${img._key ?? i}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all lg:h-20 lg:w-full",
                    i === active
                      ? "border-pink-2000 shadow-[0_0_16px_rgba(255,105,180,0.6)]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={src}
                    alt={img.alt ?? `${title} — miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="112px"
                    loading={i === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                    data-cursor-image="true"
                  />
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="relative min-h-[320px] flex-1 overflow-hidden rounded-2xl border-4 border-pink-2000/25 bg-night-purple/5 shadow-inner"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="group relative aspect-[3/4] w-full max-h-[85vh] lg:aspect-auto lg:min-h-[480px]"
              >
                <SparkleHoverSurface className="h-full w-full rounded-2xl">
                  <Image
                    src={mainSrc}
                    alt={main.alt ?? title}
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    data-cursor-image="true"
                  />
                </SparkleHoverSurface>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Painel lateral: tags + janela */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-center gap-2 lg:justify-start">
            <span
              className="inline-flex rotate-[-4deg] items-center gap-1 rounded border-2 border-night-purple bg-flash-photo px-3 py-1 font-[family-name:var(--font-vt323)] text-sm text-night-purple shadow-md"
              style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 25%)" }}
            >
              📅 {year}
            </span>
            {category.map((c) => (
              <span
                key={c}
                className="inline-flex rotate-[3deg] items-center rounded-sm border border-pink-2000 bg-white px-2 py-1 font-[family-name:var(--font-vt323)] text-xs uppercase tracking-wide text-pink-2000 shadow-[2px_3px_0_rgba(75,0,130,0.2)]"
              >
                🏷 {tagLabel(c)}
              </span>
            ))}
            {(tools ?? []).map((t) => (
              <span
                key={t}
                className="inline-flex -rotate-2 items-center rounded-full border border-plaid-blue/40 bg-plaid-blue/10 px-3 py-0.5 font-[family-name:var(--font-vt323)] text-xs text-night-purple"
              >
                🛠 {t}
              </span>
            ))}
          </div>

          <DesktopWindow title={`sobre_${slug}.txt`} variant="pink" className="max-h-[min(60vh,520px)] overflow-y-auto">
            <div className="p-4">
              <RichText value={description} />
            </div>
          </DesktopWindow>
        </div>
      </div>

      {/* Navegação entre projetos */}
      <nav className="mt-12 flex flex-col items-stretch justify-between gap-4 border-t-2 border-dashed border-pink-2000/30 pt-8 sm:flex-row sm:items-center">
        {prev ? (
          <Link
            href={`/projetos/${prev.slug}`}
            className="group flex items-center gap-3 rounded-2xl border-2 border-night-purple/15 bg-white/80 px-4 py-3 font-[family-name:var(--font-vt323)] text-night-purple shadow-[4px_4px_0_#FF69B4] transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-2000 to-glitter-pink text-white shadow-inner">
              <ChevronLeft className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-xs uppercase text-night-purple/60">Anterior</span>
              <span className="text-lg">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projetos/${next.slug}`}
            className="group flex flex-row-reverse items-center gap-3 rounded-2xl border-2 border-night-purple/15 bg-white/80 px-4 py-3 text-right font-[family-name:var(--font-vt323)] text-night-purple shadow-[4px_4px_0_#FF69B4] transition-transform hover:-translate-y-0.5 sm:ml-auto"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-glitter-pink to-night-purple text-white shadow-inner">
              <ChevronRight className="h-7 w-7" />
            </span>
            <span>
              <span className="block text-xs uppercase text-night-purple/60">Próximo</span>
              <span className="text-lg">{next.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
