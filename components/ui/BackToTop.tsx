"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  label?: string;
  className?: string;
}

/** Epsilon em px para o fio de navalha conteúdo ≈ viewport. */
const SCROLL_EPSILON = 2;

export function BackToTop({ label = "↑ Voltar ao Topo", className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      // Desconta a própria altura quando renderizado: o botão não pode
      // criar o scroll que o justifica. Oculto (display:none), offsetHeight = 0.
      const own = wrapperRef.current?.offsetHeight ?? 0;
      const content = document.documentElement.scrollHeight - own;
      setVisible(content > window.innerHeight + SCROLL_EPSILON);
    };
    measure();
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(className ?? "flex justify-center py-12", !visible && "hidden")}
    >
      <a
        href="#conteudo-principal"
        className="text-sm uppercase tracking-[0.25em] no-underline text-[var(--color-muted)] transition-opacity hover:opacity-100 hover:text-[var(--color-ink)]"
        onClick={(e) => {
          e.preventDefault();
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        }}
      >
        {label}
      </a>
    </div>
  );
}
