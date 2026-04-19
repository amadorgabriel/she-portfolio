"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const glossyButtonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center gap-2",
    "font-[family-name:var(--font-fredoka)] font-semibold",
    "rounded-full transition-all duration-200",
    "border-2 border-white/30",
    "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_6px_10px_rgba(0,0,0,0.15)]",
    "active:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.15)]",
    "active:translate-y-[3px]",
    "hover:brightness-110",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-flash-photo focus-visible:ring-offset-2"
  ),
  {
    variants: {
      variant: {
        pink: cn(
          "bg-gradient-to-b from-[#FF69B4] to-[#FF1493]",
          "text-white",
          "shadow-pink-2000/30"
        ),
        gold: cn(
          "bg-gradient-to-b from-[#FFE55C] to-[#FFD700]",
          "text-night-purple",
          "border-yellow-200",
          "shadow-yellow-500/30"
        ),
        leopard: cn(
          "bg-gradient-to-b from-[#D4A373] to-[#8B4513]",
          "text-white",
          "relative overflow-hidden",
          "shadow-leopard-brown/30"
        ),
        outline: cn(
          "bg-transparent",
          "border-2 border-pink-2000 text-pink-2000",
          "hover:bg-pink-2000/10",
          "shadow-none"
        ),
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
      hasSparkle: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "md",
      hasSparkle: false,
    },
  }
);

export interface GlossyButtonProps
  extends VariantProps<typeof glossyButtonVariants> {
  /** Quando definido, renderiza como link (navegação acessível + SEO). */
  href?: string;
  sparklePosition?: "left" | "right" | "both";
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function GlossyButton({
  className,
  variant,
  size,
  hasSparkle,
  href,
  sparklePosition = "right",
  isLoading,
  children,
  disabled,
  onClick,
  type = "button",
}: GlossyButtonProps) {
  const showSparkleLeft = hasSparkle && (sparklePosition === "left" || sparklePosition === "both");
  const showSparkleRight = hasSparkle && (sparklePosition === "right" || sparklePosition === "both");

  const buttonClass = cn(glossyButtonVariants({ variant, size, hasSparkle }), className);

  const inner = (
    <>
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      {variant === "leopard" && (
        <span
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2h2v2H2V2zm4 4h2v2H6V6zm8 8h2v2h-2v-2zm-4 4h2v2h-2v-2z' fill='%23000' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {showSparkleLeft && (
        <motion.span
          animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-flash-photo" />
        </motion.span>
      )}

      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.span>
        ) : (
          children
        )}
      </span>

      {showSparkleRight && (
        <motion.span
          animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-flash-photo" />
        </motion.span>
      )}
    </>
  );

  if (href && !disabled && !isLoading) {
    return (
      <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98, y: 2 }} className="inline-block">
        <Link
          href={href}
          className={cn(
            buttonClass,
            "no-underline text-inherit cursor-pointer",
            "relative inline-flex items-center justify-center"
          )}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 2 }}
      className={buttonClass}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
    >
      {inner}
    </motion.button>
  );
}

// Botão de ícone circular (para docks/toolbars)
interface GlossyIconButtonProps extends VariantProps<typeof glossyButtonVariants> {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function GlossyIconButton({
  className,
  variant = "pink",
  size = "md",
  children,
  disabled,
  onClick,
  type = "button",
}: GlossyIconButtonProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
    xl: "w-16 h-16",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        glossyButtonVariants({ variant }),
        sizeClasses[size as keyof typeof sizeClasses],
        "p-0 rounded-full",
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
