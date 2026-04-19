"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlitterTextProps {
  children: ReactNode;
  className?: string;
  variant?: "pink" | "gold" | "purple" | "rainbow";
  size?: "sm" | "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animated?: boolean;
  sparkle?: boolean;
}

export function GlitterText({
  children,
  className,
  variant = "pink",
  size = "md",
  as: Component = "span",
  animated = true,
  sparkle = true,
}: GlitterTextProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl md:text-3xl",
    xl: "text-4xl md:text-5xl lg:text-6xl",
  };

  const fontClasses = {
    h1: "font-[family-name:var(--font-fredoka)] font-bold",
    h2: "font-[family-name:var(--font-fredoka)] font-semibold",
    h3: "font-[family-name:var(--font-fredoka)] font-semibold",
    h4: "font-[family-name:var(--font-vt323)]",
    p: "font-[family-name:var(--font-inter)]",
    span: "font-[family-name:var(--font-fredoka)] font-semibold",
  };

  const gradientStyles = {
    pink: "bg-gradient-to-r from-[#FF1493] via-[#FF69B4] to-[#FF1493]",
    gold: "bg-gradient-to-r from-[#FFD700] via-[#FFE55C] to-[#FFD700]",
    purple: "bg-gradient-to-r from-[#4B0082] via-[#6A0DAD] to-[#4B0082]",
    rainbow:
      "bg-gradient-to-r from-[#FF1493] via-[#FFD700] via-[#00FF00] via-[#00FFFF] to-[#FF1493]",
  };

  return (
    <div className="relative inline-block">
      {/* Sparkles ao redor */}
      {sparkle && animated && (
        <>
          <motion.span
            className="absolute -left-4 top-0 text-flash-photo"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 20, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -right-4 top-0 text-flash-photo"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.span>
        </>
      )}

      {/* Texto com glitter effect */}
      <motion.span
        className={cn(
          "relative inline-block",
          sizeClasses[size],
          fontClasses[Component],
          gradientStyles[variant],
          "bg-clip-text text-transparent",
          "bg-[length:200%_100%]",
          animated && "animate-glossy-shine",
          className
        )}
        {...(animated && {
          animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        })}
      >
        {children}
      </motion.span>

      {/* Glow shadow */}
      <span
        className={cn(
          "absolute inset-0 blur-lg opacity-50 -z-10",
          variant === "pink" && "bg-pink-2000",
          variant === "gold" && "bg-flash-photo",
          variant === "purple" && "bg-night-purple",
          variant === "rainbow" && "bg-gradient-to-r from-pink-2000 via-flash-photo to-night-purple"
        )}
      >
        {children}
      </span>
    </div>
  );
}

// Texto com efeito de pixel/display
export function PixelText({
  children,
  className,
  size = "md",
  color = "pink",
  blink = false,
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "pink" | "green" | "amber";
  blink?: boolean;
}) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl md:text-2xl",
    xl: "text-3xl md:text-4xl",
  };

  const colorClasses = {
    pink: "text-pink-2000",
    green: "text-green-600",
    amber: "text-amber-500",
  };

  return (
    <span
      className={cn(
        "font-[family-name:var(--font-vt323)] uppercase tracking-wider",
        sizeClasses[size],
        colorClasses[color],
        blink && "animate-pulse",
        className
      )}
    >
      {children}
    </span>
  );
}

// Texto com efeito de digitação (typewriter)
export function TypewriterText({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}) {
  const characters = text.split("");

  return (
    <span className={cn("font-[family-name:var(--font-vt323)] text-lg", className)}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * (speed / 1000),
            duration: 0.01,
          }}
          onAnimationComplete={index === characters.length - 1 ? onComplete : undefined}
        >
          {char}
        </motion.span>
      ))}

      {/* Cursor piscando */}
      {cursor && (
        <motion.span
          className="inline-block w-2 h-5 bg-current ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
}
