import type { OgTemplateContent } from "@/components/og/types";

export function AtelierOgPreview({ brandName, tagline }: OgTemplateContent) {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f7f6f3] text-[#1a1a1a]">
      <div
        className="pointer-events-none absolute border border-[#d8d6d1]"
        style={{
          top: -48,
          right: -24,
          width: 220,
          height: 220,
          transform: "rotate(12deg)",
        }}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col justify-between p-8 sm:p-14">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] sm:text-xs">
          {brandName} · Estúdio
        </p>
        <div className="my-8 max-w-2xl">
          <h1 className="font-display text-5xl font-medium leading-[0.95] sm:text-7xl md:text-8xl">
            {brandName}
          </h1>
          <p className="font-body mt-6 text-base leading-snug text-[#6b6b6b] sm:text-xl">
            {tagline}
          </p>
        </div>
        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#6b6b6b] sm:text-xs">
          karinareis.com
        </p>
      </div>
    </div>
  );
}
