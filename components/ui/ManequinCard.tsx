"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import { SparkleHoverSurface } from "@/components/interactive/SparkleHoverSurface";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";

interface ManequinCardProps {
  id: string;
  title: string;
  year: number;
  category: string;
  thumbnail: string;
  href: string;
  isNew?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  className?: string;
  index?: number;
  /** LCP: apenas 1–2 cards acima da dobra. */
  imagePriority?: boolean;
  imageSizes?: string;
}

export function ManequinCard({
  id,
  title,
  year,
  category,
  thumbnail,
  href,
  isNew = false,
  isFavorite = false,
  onFavoriteToggle,
  className,
  index = 0,
  imagePriority = false,
  imageSizes,
}: ManequinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const thumbRemote = thumbnail.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group relative", className)}
    >
      {/* Cabide SVG */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
        animate={isHovered ? { y: [-2, 2, -2] } : {}}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      >
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          fill="none"
          className="drop-shadow-md"
        >
          {/* Gancho do cabide */}
          <path
            d="M30 5 C30 0, 35 0, 35 5 C35 8, 30 8, 30 12"
            stroke="#8B4513"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Corpo do cabide */}
          <path
            d="M30 12 L15 25 Q10 28, 15 30 L45 30 Q50 28, 45 25 L30 12"
            fill="#A0522D"
            stroke="#8B4513"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      <Link href={href} className="block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative bg-white rounded-t-3xl rounded-b-lg",
            "border-2 border-pink-2000/20",
            "shadow-[0_8px_0_0_rgba(255,20,147,0.15)]",
            "hover:shadow-[0_12px_0_0_rgba(255,20,147,0.25)]",
            "transition-all duration-300",
            "overflow-hidden"
          )}
        >
          {/* Badge "New" */}
          {isNew && (
            <div className="absolute top-2 left-2 z-20">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block px-2 py-0.5 bg-flash-photo text-night-purple text-xs font-bold rounded-full shadow-sm"
              >
                NEW!
              </motion.span>
            </div>
          )}

          {/* Botão de favorito */}
          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavoriteToggle(id);
              }}
              className={cn(
                "absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all",
                "bg-white/80 hover:bg-white shadow-sm",
                isFavorite ? "text-pink-2000" : "text-gray-400 hover:text-pink-2000"
              )}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
          )}

          {/* Imagem + glitter */}
          <SparkleHoverSurface className="rounded-t-3xl">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-3xl bg-gray-100">
              <Image
                src={thumbnail}
                alt={title}
                fill
                priority={imagePriority}
                loading={imagePriority ? undefined : "lazy"}
                sizes={imageSizes ?? "(max-width: 768px) 50vw, (max-width:1200px) 33vw, 300px"}
                placeholder={thumbRemote ? "blur" : "empty"}
                blurDataURL={thumbRemote ? IMAGE_BLUR_DATA_URL : undefined}
                className={cn(
                  "object-cover transition-all duration-500",
                  isHovered && "scale-105"
                )}
                data-cursor-image="true"
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-pink-2000/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-flash-photo/20 to-transparent"
                initial={{ x: "-100%", opacity: 0 }}
                animate={isHovered ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </SparkleHoverSurface>

          {/* Info do produto */}
          <div className="p-3 bg-white">
            {/* Categoria */}
            <p className="font-[family-name:var(--font-vt323)] text-xs text-night-purple uppercase tracking-wider">
              {category}
            </p>

            {/* Título */}
            <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-dark-text line-clamp-1 mt-0.5">
              {title}
            </h3>

            {/* Tag de preço com ano */}
            <div className="flex items-center justify-between mt-2">
              <motion.div
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full",
                  "bg-pink-2000/10 text-pink-2000"
                )}
                animate={isHovered ? { scale: 1.05 } : {}}
              >
                <Tag className="w-3 h-3" />
                <span className="font-[family-name:var(--font-vt323)] text-sm">{year}</span>
              </motion.div>

              {/* Sparkle decorativo */}
              <motion.span
                animate={isHovered ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
              >
                <Sparkles className="w-4 h-4 text-flash-photo" />
              </motion.span>
            </div>
          </div>

          {/* Barra inferior estilo etiqueta */}
          <div className="h-1 bg-gradient-to-r from-pink-2000 via-glitter-pink to-pink-2000" />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Grid de cards estilo closet
interface ManequinGridProps {
  items: Array<{
    id: string;
    title: string;
    year: number;
    category: string;
    thumbnail: string;
    href: string;
    isNew?: boolean;
  }>;
  className?: string;
}

export function ManequinGrid({ items, className }: ManequinGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 pt-8", className)}>
      {items.map((item, index) => (
        <ManequinCard key={item.id} {...item} index={index} />
      ))}
    </div>
  );
}

// Skeleton para loading
export function ManequinCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pt-8"
    >
      {/* Cabide placeholder */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-8 bg-gray-200 rounded" />

      <div className="bg-white rounded-t-3xl rounded-b-lg border-2 border-gray-200 overflow-hidden">
        <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
        <div className="p-3 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </motion.div>
  );
}
