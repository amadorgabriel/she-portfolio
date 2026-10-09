import type { OgTemplateContent } from "@/components/og/types";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ImprintOgImage({ brandName, tagline }: OgTemplateContent) {
  const mark = initials(brandName) || "KR";
  return (
    <div tw="flex w-full h-full bg-[#1a1a1a] text-[#f7f6f3] flex-col">
      <div tw="flex flex-1 items-center px-20 gap-16">
        <div
          tw="flex items-center justify-center rounded-full border border-[#f7f6f3] flex-shrink-0"
          style={{ width: 200, height: 200 }}
        >
          <span
            tw="text-[72px] font-medium"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            {mark}
          </span>
        </div>
        <div tw="flex flex-col flex-1">
          <h1
            tw="text-[84px] leading-none font-medium"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            {brandName}
          </h1>
          <p
            tw="text-[26px] mt-8 leading-snug opacity-80 max-w-[680px]"
            style={{ fontFamily: "DM Sans" }}
          >
            {tagline}
          </p>
        </div>
      </div>
      <div
        tw="flex items-center justify-between px-20 py-8 bg-[#f7f6f3] text-[#1a1a1a]"
        style={{ fontFamily: "DM Sans", fontWeight: 500 }}
      >
        <span
          tw="text-[18px] uppercase"
          style={{ letterSpacing: "0.35em" }}
        >
          Portfólio
        </span>
        <span
          tw="text-[18px] uppercase opacity-60"
          style={{ letterSpacing: "0.2em" }}
        >
          Design · Moda · Estamparia
        </span>
      </div>
    </div>
  );
}
