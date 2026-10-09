"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import type { OgTemplateContent } from "@/components/og/types";
import { EditorialOgPreview } from "@/components/og/preview/EditorialOgPreview";
import { AtelierOgPreview } from "@/components/og/preview/AtelierOgPreview";
import { ImprintOgPreview } from "@/components/og/preview/ImprintOgPreview";
import "./proto-picker.css";

const VARIANTS: {
  id: string;
  label: string;
  Component: ComponentType<OgTemplateContent>;
}[] = [
  { id: "editorial", label: "Editorial", Component: EditorialOgPreview },
  { id: "atelier", label: "Atelier", Component: AtelierOgPreview },
  { id: "imprint", label: "Imprint", Component: ImprintOgPreview },
];

type OgDefaultHarnessProps = OgTemplateContent & {
  initialIndex?: number;
};

export function OgDefaultHarness({
  brandName,
  tagline,
  initialIndex = 0,
}: OgDefaultHarnessProps) {
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = useState(initialIndex);
  const [mountKey, setMountKey] = useState(0);

  const moveHighlight = useCallback(() => {
    const picker = pickerRef.current;
    const highlight = highlightRef.current;
    const el = itemRefs.current[current];
    if (!picker || !highlight || !el) return;
    highlight.style.width = `${el.offsetWidth}px`;
    highlight.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [current]);

  useLayoutEffect(() => {
    moveHighlight();
  }, [moveHighlight, current]);

  useEffect(() => {
    const picker = pickerRef.current;
    if (!picker) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => picker.setAttribute("data-ready", ""));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onResize = () => moveHighlight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveHighlight]);

  const setActive = useCallback((index: number) => {
    if (index < 0 || index >= VARIANTS.length) return;
    setCurrent(index);
    setMountKey((k) => k + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(null, "", url);
  }, []);

  const currentRef = useRef(current);
  currentRef.current = current;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= VARIANTS.length) {
        e.preventDefault();
        setActive(num - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((currentRef.current + 1) % VARIANTS.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive(
          (currentRef.current - 1 + VARIANTS.length) % VARIANTS.length
        );
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [setActive]);

  const { Component } = VARIANTS[current]!;

  return (
    <div className="min-h-[100dvh] bg-[#e8e6e1] px-4 py-10 pb-28 text-[#1a1a1a] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 space-y-2">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#6b6b6b]">
            Pré-visualização · 1200×630
          </p>
          <h1 className="font-display text-3xl font-medium sm:text-4xl">
            Imagem Open Graph padrão
          </h1>
          <p className="font-body max-w-2xl text-sm leading-relaxed text-[#6b6b6b] sm:text-base">
            Usada quando não há imagem configurada no Sanity. A imagem OG do CMS
            continua a ter prioridade nas páginas que a definem.
          </p>
        </header>

        <div className="rounded-2xl border border-[#d8d6d1] bg-[#ffffff] p-4 shadow-sm sm:p-6">
          <p className="font-body mb-3 text-[11px] uppercase tracking-[0.25em] text-[#6b6b6b]">
            Cartão de partilha (simulado)
          </p>
          <div className="overflow-hidden rounded-xl border border-[#d8d6d1]">
            <div className="aspect-[1200/630] w-full">
              <div key={mountKey} className="h-full w-full">
                <Component brandName={brandName} tagline={tagline} />
              </div>
            </div>
            <div className="space-y-1 border-t border-[#d8d6d1] bg-[#faf9f7] px-4 py-3">
              <p className="font-body text-xs uppercase tracking-wide text-[#6b6b6b]">
                karinareis.com
              </p>
              <p className="font-display text-lg font-medium">{brandName}</p>
              <p className="font-body line-clamp-2 text-sm text-[#6b6b6b]">{tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <nav ref={pickerRef} className="proto-picker" aria-label="Prototype variants">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden />
        {VARIANTS.map((variant, index) => (
          <button
            key={variant.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            className="proto-picker-item"
            data-active={index === current ? true : undefined}
            aria-current={index === current ? "true" : undefined}
            onClick={() => setActive(index)}
          >
            {variant.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
