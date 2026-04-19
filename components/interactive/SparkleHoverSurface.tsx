"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Spark = { id: number; x: number; y: number; char: string };

const CHARS = ["✨", "⭐", "💫", "✦", "🌟"];

type SparkleHoverSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  /** Throttle em ms entre partículas */
  throttleMs?: number;
};

export function SparkleHoverSurface({
  children,
  className,
  throttleMs = 42,
}: SparkleHoverSurfaceProps) {
  const reduce = useReducedMotion();
  const [sparks, setSparks] = useState<Spark[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce) return;
      const now = performance.now();
      if (now - lastRef.current < throttleMs) return;
      lastRef.current = now;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idRef.current;
      const char = CHARS[id % CHARS.length];
      setSparks((s) => [...s.slice(-14), { id, x, y, char }]);
      window.setTimeout(() => {
        setSparks((s) => s.filter((sp) => sp.id !== id));
      }, 520);
    },
    [reduce, throttleMs]
  );

  return (
    <div className={cn("relative", className)} onPointerMove={onPointerMove}>
      {children}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
        <AnimatePresence>
          {sparks.map((s) => (
            <motion.span
              key={s.id}
              className="absolute select-none text-lg drop-shadow-md"
              style={{ left: s.x, top: s.y, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0.95, scale: 0.5, rotate: -12 }}
              animate={{ opacity: 0, scale: 1.35, y: -28, rotate: 18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {s.char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
