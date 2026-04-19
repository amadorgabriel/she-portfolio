"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  isActive?: boolean;
  badge?: number | string;
}

interface NavigationDockProps {
  items: DockItem[];
  position?: "bottom" | "left" | "right";
  variant?: "floating" | "fixed";
  className?: string;
}

export function NavigationDock({
  items,
  position = "bottom",
  variant = "floating",
  className,
}: NavigationDockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const positionClasses = {
    bottom: "bottom-6 left-1/2 -translate-x-1/2 flex-row",
    left: "left-6 top-1/2 -translate-y-1/2 flex-col",
    right: "right-6 top-1/2 -translate-y-1/2 flex-col",
  };

  const variantClasses = {
    floating: "fixed z-50",
    fixed: "relative",
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: position === "bottom" ? 100 : 0, x: position === "left" ? -100 : position === "right" ? 100 : 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "flex items-center gap-2 p-3 rounded-2xl",
        "bg-polaroid-offwhite/90 backdrop-blur-md",
        "border-2 border-pink-2000/20",
        "shadow-[0_8px_32px_rgba(255,20,147,0.15)]",
        positionClasses[position],
        variantClasses[variant],
        className
      )}
    >
      {items.map((item) => (
        <DockButton
          key={item.id}
          item={item}
          isHovered={hoveredId === item.id}
          onHoverStart={() => setHoveredId(item.id)}
          onHoverEnd={() => setHoveredId(null)}
          position={position}
        />
      ))}
    </motion.nav>
  );
}

function DockButton({
  item,
  isHovered,
  onHoverStart,
  onHoverEnd,
  position,
}: {
  item: DockItem;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  position: "bottom" | "left" | "right";
}) {
  const isVertical = position === "left" || position === "right";

  return (
    <div className="relative">
      <Link href={item.href} className="block">
        <motion.button
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          whileHover={{ scale: 1.2, y: isVertical ? 0 : -8 }}
          whileTap={{ scale: 0.9 }}
          animate={item.isActive ? { scale: 1.1 } : {}}
          className={cn(
            "relative flex items-center justify-center",
            "w-12 h-12 rounded-xl",
            "transition-colors duration-200",
            "bg-gradient-to-b from-white to-gray-100",
            "border border-gray-200",
            "shadow-[0_4px_0_0_rgba(0,0,0,0.1)]",
            "active:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
            "active:translate-y-[2px]",
            item.isActive && [
              "from-pink-2000/20 to-glitter-pink/20",
              "border-pink-2000/40",
              "text-pink-2000",
            ]
          )}
        >
          {/* Ícone */}
          <span className={cn("text-xl", item.isActive ? "text-pink-2000" : "text-night-purple")}>
            {item.icon}
          </span>

          {/* Indicador de ativo */}
          {item.isActive && (
            <motion.span
              layoutId="activeIndicator"
              className={cn(
                "absolute bg-pink-2000 rounded-full",
                isVertical ? "left-0 w-1 h-6" : "bottom-0 w-6 h-1"
              )}
            />
          )}

          {/* Badge */}
          {item.badge && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-flash-photo text-night-purple text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
              {item.badge}
            </span>
          )}
        </motion.button>
      </Link>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          y: isHovered ? (isVertical ? 0 : -8) : 0,
          x: isHovered ? (isVertical ? 8 : 0) : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute pointer-events-none z-50",
          "px-2 py-1 rounded-lg",
          "bg-night-purple text-white",
          "font-[family-name:var(--font-vt323)] text-sm whitespace-nowrap",
          isVertical ? "left-full ml-2 top-1/2 -translate-y-1/2" : "bottom-full left-1/2 -translate-x-1/2 mb-2"
        )}
      >
        {item.label}
        {/* Seta do tooltip */}
        <span
          className={cn(
            "absolute w-2 h-2 bg-night-purple rotate-45",
            isVertical ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" : "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          )}
        />
      </motion.div>
    </div>
  );
}

// Dock simplificado para mobile
export function MobileDock({ items, className }: { items: DockItem[]; className?: string }) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-polaroid-offwhite border-t-2 border-pink-2000/20",
        "safe-area-pb",
        className
      )}
    >
      <div className="flex items-center justify-around p-2 max-w-lg mx-auto">
        {items.map((item) => (
          <Link key={item.id} href={item.href} className="flex-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={cn(
                "flex flex-col items-center gap-1 w-full py-2 rounded-lg",
                "transition-colors",
                item.isActive ? "text-pink-2000" : "text-night-purple/60 hover:text-night-purple"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-[family-name:var(--font-vt323)] text-xs">{item.label}</span>
              {item.isActive && (
                <motion.span
                  layoutId="mobileIndicator"
                  className="absolute bottom-1 w-1 h-1 bg-pink-2000 rounded-full"
                />
              )}
            </motion.button>
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Breadcrumbs estilo Y2K
export function Y2KBreadcrumbs({
  items,
  className,
}: {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-glitter-pink">✦</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="font-[family-name:var(--font-vt323)] text-night-purple hover:text-pink-2000 transition-colors underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-[family-name:var(--font-fredoka)] text-pink-2000">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
