"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "footer";
};

export function RevealOnScroll({ children, className, as = "div" }: RevealOnScrollProps) {
  const reduce = useReducedMotion();
  const MotionComp =
    as === "section"
      ? motion.section
      : as === "article"
        ? motion.article
        : as === "footer"
          ? motion.footer
          : motion.div;

  return (
    <MotionComp
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </MotionComp>
  );
}
