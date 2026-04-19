"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { urlFor } from "@/sanity/client";
import type { ProjectCardData } from "@/types/sanity";
import { CATEGORY_LABELS } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectCardData;
  index?: number;
  className?: string;
  showCategory?: boolean;
  showYear?: boolean;
  size?: "small" | "medium" | "large";
}

export function ProjectCard({
  project,
  index = 0,
  className,
  showCategory = true,
  showYear = true,
  size = "medium",
}: ProjectCardProps) {
  const { title, slug, category, thumbnail, year, isFeatured } = project;

  // Tamanhos responsivos baseados no prop size
  const sizeClasses = {
    small: "w-48 md:w-56",
    medium: "w-64 md:w-72",
    large: "w-72 md:w-80",
  };

  // Gerar rotação aleatória mas consistente para cada card (estilo Polaroid)
  const rotation = ((index % 3) - 1) * 2; // -2, 0, ou 2 graus

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
      className={cn("group relative", sizeClasses[size], className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Link href={`/projeto/${slug}`} className="block cursor-star">
        {/* Frame estilo "item de closet virtual" Y2K */}
        <div
          className={cn(
            "relative overflow-hidden rounded-lg",
            "border-4 border-pink-2000",
            "shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]",
            "transition-all duration-300",
            "group-hover:shadow-[6px_6px_0px_0px_rgba(255,20,147,0.5)]",
            "group-hover:border-glitter-pink"
          )}
        >
          {/* Badge de destaque */}
          {isFeatured && (
            <div className="absolute top-2 right-2 z-10">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-flash-photo fill-flash-photo" />
              </motion.div>
            </div>
          )}

          {/* Imagem com efeito glossy */}
          <div className="relative aspect-[4/5] overflow-hidden bg-polaroid-offwhite">
            {thumbnail ? (
              <Image
                src={urlFor(thumbnail).width(600).height(750).format("webp").url()}
                alt={thumbnail.alt || title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-cover transition-all duration-500",
                  "group-hover:scale-105",
                  "group-hover:brightness-110"
                )}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-soft-white">
                <span className="text-6xl">👗</span>
              </div>
            )}

            {/* Overlay com gradiente glossy */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100",
                "bg-gradient-to-t from-pink-2000/80 via-transparent to-transparent"
              )}
            />

            {/* Botão de favorito (visual apenas por enquanto) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Implementar favoritos com localStorage
              }}
              className={cn(
                "absolute top-2 left-2 z-10",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "p-1.5 rounded-full bg-white/80 hover:bg-white"
              )}
            >
              <Heart className="w-4 h-4 text-pink-2000" />
            </button>
          </div>

          {/* Info bar estilo "label de roupa" */}
          <div className="bg-polaroid-offwhite p-3 border-t-2 border-pink-2000/20">
            <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-dark-text line-clamp-1">
              {title}
            </h3>

            <div className="flex items-center justify-between mt-1">
              {showCategory && category && category.length > 0 && (
                <span className="font-[family-name:var(--font-vt323)] text-sm text-night-purple">
                  {CATEGORY_LABELS[category[0] as keyof typeof CATEGORY_LABELS] || category[0]}
                </span>
              )}
              {showYear && (
                <span className="font-[family-name:var(--font-caveat)] text-sm text-leopard-brown">
                  {year}
                </span>
              )}
            </div>
          </div>

          {/* Efeito de brilho na borda */}
          <div
            className={cn(
              "absolute inset-0 rounded-lg pointer-events-none",
              "border border-white/30 opacity-0",
              "group-hover:opacity-100 transition-opacity"
            )}
          />
        </div>

        {/* Sombra estilo "item de closet" */}
        <div
          className={cn(
            "absolute -bottom-2 left-1/2 -translate-x-1/2",
            "w-[90%] h-4",
            "bg-black/10 blur-md rounded-full",
            "transition-all duration-300",
            "group-hover:w-[95%] group-hover:bg-black/15"
          )}
        />
      </Link>
    </motion.div>
  );
}

// Skeleton para loading states
export function ProjectCardSkeleton({
  size = "medium",
  className,
}: {
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  const sizeClasses = {
    small: "w-48 md:w-56",
    medium: "w-64 md:w-72",
    large: "w-72 md:w-80",
  };

  return (
    <div className={cn("animate-pulse", sizeClasses[size], className)}>
      <div className="border-4 border-pink-2000/30 rounded-lg overflow-hidden bg-polaroid-offwhite">
        <div className="aspect-[4/5] bg-gray-200" />
        <div className="p-3 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}
