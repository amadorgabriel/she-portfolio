"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StarDividerProps {
  className?: string;
  variant?: "horizontal" | "vertical";
  color?: "pink" | "gold" | "white" | "purple";
  size?: "sm" | "md" | "lg";
  sparkleCount?: number;
  animated?: boolean;
}

export function StarDivider({
  className,
  variant = "horizontal",
  color = "pink",
  size = "md",
  sparkleCount = 5,
  animated = true,
}: StarDividerProps) {
  const colorClasses = {
    pink: "text-pink-2000",
    gold: "text-flash-photo",
    white: "text-white",
    purple: "text-night-purple",
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const starSize = {
    sm: 16,
    md: 20,
    lg: 28,
  };

  // Gera posições aleatórias para as estrelas
  const stars = Array.from({ length: sparkleCount }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    scale: 0.8 + Math.random() * 0.4,
  }));

  const StarSVG = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width={starSize[size]}
      height={starSize[size]}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  if (variant === "vertical") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-1",
          colorClasses[color],
          sizeClasses[size],
          className
        )}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              animated
                ? {
                    opacity: [0.4, 1, 0.4],
                    scale: [star.scale * 0.8, star.scale * 1.2, star.scale * 0.8],
                    rotate: [0, 15, -15, 0],
                  }
                : { opacity: 1, scale: star.scale }
            }
            transition={
              animated
                ? {
                    duration: 2 + star.delay,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeInOut",
                  }
                : undefined
            }
          >
            <StarSVG />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        "w-full",
        className
      )}
    >
      {/* Linha esquerda */}
      <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-current to-current opacity-50" />

      {/* Estrelas centrais */}
      <div className={cn("flex items-center gap-1", colorClasses[color], sizeClasses[size])}>
        {stars.map((star, index) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              animated
                ? {
                    opacity: [0.4, 1, 0.4],
                    scale: [star.scale * 0.8, star.scale * 1.2, star.scale * 0.8],
                    rotate: [0, 15, -15, 0],
                  }
                : { opacity: 1, scale: star.scale }
            }
            transition={
              animated
                ? {
                    duration: 2 + star.delay,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeInOut",
                  }
                : undefined
            }
          >
            {index % 2 === 0 ? (
              <StarSVG />
            ) : (
              <motion.span
                animate={animated ? { scale: [1, 1.3, 1] } : undefined}
                transition={animated ? { duration: 1.5, repeat: Infinity, delay: star.delay } : undefined}
              >
                ✨
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Linha direita */}
      <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-current to-current opacity-50" />
    </div>
  );
}

// Versão simples com apenas uma estrela
export function SingleStar({
  className,
  color = "pink",
  size = "md",
  animated = true,
}: Omit<StarDividerProps, "variant" | "sparkleCount">) {
  const colorClasses = {
    pink: "text-pink-2000",
    gold: "text-flash-photo",
    white: "text-white",
    purple: "text-night-purple",
  };

  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <motion.span
      className={cn("inline-block", colorClasses[color], className)}
      animate={animated ? { rotate: [0, 20, -20, 0], scale: [1, 1.1, 1] } : undefined}
      transition={animated ? { duration: 2, repeat: Infinity } : undefined}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={sizeMap[size]} height={sizeMap[size]}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </motion.span>
  );
}

// Divisor com glitter particles
export function GlitterDivider({
  className,
  color = "gold",
}: {
  className?: string;
  color?: "gold" | "pink" | "purple";
}) {
  const colors = {
    gold: "#FFD700",
    pink: "#FF69B4",
    purple: "#4B0082",
  };

  return (
    <div className={cn("relative h-8 w-full overflow-hidden", className)}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: colors[color],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
