"use client";

interface BackToTopProps {
  label?: string;
  className?: string;
}

export function BackToTop({ label = "↑ Voltar ao Topo", className }: BackToTopProps) {
  return (
    <div className={className ?? "flex justify-center py-12"}>
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
