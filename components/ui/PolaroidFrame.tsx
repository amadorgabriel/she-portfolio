"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { useState } from "react";

interface PolaroidFrameProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  rotation?: number;
  size?: "sm" | "md" | "lg";
  hasPin?: boolean;
  pinColor?: "pink" | "gold" | "purple";
  priority?: boolean;
}

export function PolaroidFrame({
  src,
  alt,
  caption,
  className,
  rotation = -3,
  size = "md",
  hasPin = true,
  pinColor = "pink",
  priority = false,
}: PolaroidFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-40 p-2 pb-6",
    md: "w-56 md:w-64 p-3 pb-8",
    lg: "w-72 md:w-80 p-4 pb-10",
  };

  const imageSizes = {
    sm: { width: 160, height: 200 },
    md: { width: 280, height: 350 },
    lg: { width: 320, height: 400 },
  };

  const pinColors = {
    pink: "text-pink-2000",
    gold: "text-flash-photo",
    purple: "text-night-purple",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative bg-polaroid-offwhite",
        "shadow-[3px_3px_10px_rgba(0,0,0,0.15)]",
        "transition-shadow duration-300",
        "hover:shadow-[5px_5px_20px_rgba(0,0,0,0.25)]",
        "cursor-pointer",
        sizeClasses[size],
        className
      )}
      style={{ transformOrigin: "center center" }}
    >
      {/* Pin/Clip no topo */}
      {hasPin && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full shadow-md",
              pinColor === "pink" && "bg-pink-2000",
              pinColor === "gold" && "bg-flash-photo",
              pinColor === "purple" && "bg-night-purple"
            )}
          >
            <Pin className={cn("w-3 h-3 text-white", pinColors[pinColor])} />
          </div>
        </motion.div>
      )}

      {/* Container da imagem */}
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100",
          "aspect-[4/5]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 300px"
          className={cn(
            "object-cover transition-all duration-500",
            isHovered && "scale-105 brightness-105"
          )}
        />

        {/* Overlay com brilho no hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-pink-2000/0 via-flash-photo/0 to-pink-2000/0"
          animate={isHovered ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
        />
      </div>

      {/* Legenda estilo handwriting */}
      {caption && (
        <div className="mt-2 text-center">
          <p className="font-[family-name:var(--font-caveat)] text-lg md:text-xl text-night-purple leading-tight">
            {caption}
          </p>
        </div>
      )}

      {/* Efeito de washi tape (fita decorativa) no canto */}
      <div
        className={cn(
          "absolute -bottom-2 -right-2 w-16 h-6 rotate-[-12deg]",
          "bg-glitter-pink/30",
          "backdrop-blur-sm"
        )}
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)",
        }}
      />
    </motion.div>
  );
}

// Polaroid grid para galerias
interface PolaroidGridProps {
  items: Array<{
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function PolaroidGrid({ items, className, columns = 3 }: PolaroidGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 md:gap-8",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-2 md:grid-cols-3",
        columns === 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item, index) => (
        <PolaroidFrame
          key={item.id}
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          rotation={(index % 3) * 3 - 3} // -3, 0, 3 graus
          size="md"
        />
      ))}
    </div>
  );
}

// Polaroid com efeito de "foto espalhada na mesa"
export function ScatteredPolaroid({
  children,
  className,
  position = { x: 0, y: 0, rotate: 0 },
}: {
  children: React.ReactNode;
  className?: string;
  position?: { x: number; y: number; rotate: number };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
        rotate: position.rotate,
      }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }}
      drag
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      className={cn(
        "absolute bg-polaroid-offwhite p-3 shadow-lg",
        "cursor-move",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
