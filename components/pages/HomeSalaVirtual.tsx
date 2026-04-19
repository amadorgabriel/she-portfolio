"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlitterText } from "@/components/ui/GlitterText";
import { GlossyButton } from "@/components/ui/GlossyButton";
import { ManequinCard } from "@/components/ui/ManequinCard";
import { StarDivider } from "@/components/ui/StarDivider";
import type { ProjectCardData } from "@/types/sanity";
import type { SiteConfig } from "@/types/sanity";
import type { About } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";
import { CATEGORY_LABELS, type ProjectCategory } from "@/types/sanity";
import { Sparkles } from "lucide-react";
import { ParallaxLayer } from "@/components/interactive/ParallaxLayer";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";
import { SparkleHoverSurface } from "@/components/interactive/SparkleHoverSurface";

type HomeSalaVirtualProps = {
  siteConfig: SiteConfig | null;
  about: About | null;
  featuredProjects: ProjectCardData[];
  sanityConfigured: boolean;
};

function categoryLabel(cats: string[]): string {
  const first = cats[0] as ProjectCategory | undefined;
  if (first && first in CATEGORY_LABELS) return CATEGORY_LABELS[first as ProjectCategory];
  return cats[0] ?? "Projeto";
}

export function HomeSalaVirtual({ siteConfig, about, featuredProjects, sanityConfigured }: HomeSalaVirtualProps) {
  const displayName = about?.nickname || about?.name || siteConfig?.siteTitle || "Designer";
  const tagline = siteConfig?.tagline || "Moda, brilho e atitude Y2K.";
  const profileSrc = about?.profileImage ? imageUrlFromSanity(about.profileImage, { width: 400, height: 400 }) : null;

  const profileRemote = Boolean(profileSrc?.startsWith("http"));

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParallaxLayer range={36} className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]">
        <div
          className="min-h-screen w-full"
          style={{
            backgroundImage: `
            linear-gradient(45deg, #4B0082 25%, transparent 25%),
            linear-gradient(-45deg, #4B0082 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #FF69B4 75%),
            linear-gradient(-45deg, transparent 75%, #FF69B4 75%)
          `,
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
          }}
        />
      </ParallaxLayer>
      <ParallaxLayer range={64} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="min-h-screen w-full bg-stars opacity-30" />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 md:py-16">
        {!sanityConfigured && (
          <div className="rounded-2xl border-2 border-flash-photo/60 bg-polaroid-offwhite/95 p-4 text-center font-[family-name:var(--font-vt323)] text-night-purple">
            Configure <code className="text-pink-2000">NEXT_PUBLIC_SANITY_PROJECT_ID</code> no .env para carregar o CMS.
          </div>
        )}

        {/* Hero — avatar Stardoll */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-center md:gap-12 md:text-left"
        >
          <div className="relative shrink-0">
            <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2 text-3xl drop-shadow-md">👑</div>
            <SparkleHoverSurface className="rounded-full">
              <div
                className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-pink-2000 shadow-[0_0_0_6px_rgba(255,182,193,0.5),0_12px_30px_rgba(255,20,147,0.35)] md:h-48 md:w-48"
                style={{ boxShadow: "0 0 0 6px #ffb7c5, 0 12px 32px rgba(255,20,147,0.4)" }}
              >
                {profileSrc ? (
                  <Image
                    src={profileSrc}
                    alt={about?.profileImage?.alt ?? about?.name ?? "Retrato da designer"}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 160px, 192px"
                    priority
                    placeholder={profileRemote ? "blur" : "empty"}
                    blurDataURL={profileRemote ? IMAGE_BLUR_DATA_URL : undefined}
                    data-cursor-image="true"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-2000 to-glitter-pink text-6xl">
                    ✨
                  </div>
                )}
              </div>
            </SparkleHoverSurface>
            <Sparkles className="absolute -right-2 bottom-2 h-8 w-8 text-flash-photo animate-pulse" />
          </div>

          <div className="max-w-xl space-y-3">
            <p className="font-[family-name:var(--font-vt323)] text-sm uppercase tracking-[0.2em] text-night-purple/80">
              Sala virtual da designer
            </p>
            <GlitterText as="h1" size="xl" variant="pink" className="block">
              {displayName}
            </GlitterText>
            <p className="font-[family-name:var(--font-caveat)] text-2xl text-night-purple md:text-3xl">{tagline}</p>
          </div>
        </motion.section>

        <RevealOnScroll as="section" className="flex flex-col items-center gap-3">
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl text-night-purple md:text-2xl">
            Em destaque no closet
          </h2>
          <StarDivider color="purple" className="max-w-md" sparkleCount={7} />
        </RevealOnScroll>

        {/* Projetos em destaque */}
        <RevealOnScroll as="section" className="grid gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.length === 0 ? (
            <p className="col-span-full text-center font-[family-name:var(--font-vt323)] text-lg text-night-purple/80">
              Nenhum projeto com <strong className="text-pink-2000">isFeatured</strong> ainda — marque no Studio Sanity.
            </p>
          ) : (
            featuredProjects.map((p, index) => (
              <ManequinCard
                key={p._id}
                id={p._id}
                title={p.title}
                year={p.year}
                category={categoryLabel(p.category)}
                thumbnail={imageUrlFromSanity(p.thumbnail, { width: 600, height: 800 })}
                href={`/projetos/${p.slug}`}
                index={index}
                imagePriority={index === 0}
              />
            ))
          )}
        </RevealOnScroll>

        <RevealOnScroll as="section" className="flex flex-col items-center gap-3">
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl text-night-purple md:text-2xl">
            Próximos passos
          </h2>
          <StarDivider color="pink" className="max-w-md" />
        </RevealOnScroll>

        <RevealOnScroll
          as="section"
          className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
        >
          <GlossyButton href="/projetos" size="lg" hasSparkle sparklePosition="both" variant="pink">
            Ver Closet de Projetos
          </GlossyButton>
          <GlossyButton href="/sobre" size="lg" variant="gold">
            Conheça a Estilista
          </GlossyButton>
        </RevealOnScroll>

        <RevealOnScroll as="footer" className="pb-6 text-center font-[family-name:var(--font-caveat)] text-night-purple/70">
          {siteConfig?.footerText ? (
            <p>{siteConfig.footerText}</p>
          ) : (
            <p>
              Feito com brilho ·{" "}
              <Link href="/contato" className="text-pink-2000 underline-offset-2 hover:underline">
                mande uma cartinha
              </Link>
            </p>
          )}
        </RevealOnScroll>
      </div>
    </div>
  );
}
