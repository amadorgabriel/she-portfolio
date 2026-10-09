import type { OgTemplateContent } from "@/components/og/types";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ImprintOgPreview({ brandName, tagline }: OgTemplateContent) {
  const mark = initials(brandName) || "KR";
  return (
    <div className="flex h-full w-full flex-col bg-[#1a1a1a] text-[#f7f6f3]">
      <div className="flex flex-1 flex-col items-start justify-center gap-8 px-8 py-10 sm:flex-row sm:items-center sm:gap-12 sm:px-14">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[#f7f6f3] sm:h-36 sm:w-36">
          <span className="font-display text-4xl font-medium sm:text-5xl">{mark}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-5xl font-medium leading-none sm:text-7xl md:text-8xl">
            {brandName}
          </h1>
          <p className="font-body mt-6 max-w-lg text-base leading-snug opacity-80 sm:text-xl">
            {tagline}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-[#f7f6f3] px-8 py-4 text-[#1a1a1a] sm:flex-row sm:items-center sm:justify-between sm:px-14">
        <span className="font-body text-[10px] uppercase tracking-[0.35em] sm:text-xs">
          Portfólio
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b] sm:text-xs">
          Design · Moda · Estamparia
        </span>
      </div>
    </div>
  );
}
