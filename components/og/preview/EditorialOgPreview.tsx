import type { OgTemplateContent } from "@/components/og/types";

export function EditorialOgPreview({ brandName, tagline }: OgTemplateContent) {
  return (
    <div className="flex h-full w-full flex-col bg-[#f7f6f3] px-10 py-8 text-[#1a1a1a] sm:px-16 sm:py-12">
      <div className="flex flex-1 flex-col items-center justify-center border border-[#d8d6d1] px-8 py-12 sm:px-14 sm:py-16">
        <p className="font-body mb-8 text-[11px] uppercase tracking-[0.35em] text-[#6b6b6b] sm:text-sm">
          Portfólio
        </p>
        <h1 className="font-display text-center text-5xl font-medium leading-none tracking-tight sm:text-7xl md:text-8xl">
          {brandName}
        </h1>
        <p className="font-body mt-8 max-w-xl text-center text-base leading-snug text-[#6b6b6b] sm:mt-10 sm:text-xl">
          {tagline}
        </p>
      </div>
    </div>
  );
}
