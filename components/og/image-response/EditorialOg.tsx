import type { OgTemplateContent } from "@/components/og/types";

export function EditorialOgImage({ brandName, tagline }: OgTemplateContent) {
  return (
    <div
      tw="flex flex-col w-full h-full bg-[#f7f6f3] text-[#1a1a1a] px-20 py-16"
      style={{ fontFamily: "Cormorant Garamond" }}
    >
      <div tw="flex flex-1 flex-col items-center justify-center border border-[#d8d6d1] px-16 py-20">
        <p
          tw="text-[22px] uppercase mb-10 opacity-70"
          style={{ fontFamily: "DM Sans", letterSpacing: "0.35em" }}
        >
          Portfólio
        </p>
        <h1 tw="text-[96px] leading-none text-center font-medium tracking-tight">
          {brandName}
        </h1>
        <p
          tw="text-[28px] mt-12 text-center max-w-[820px] leading-snug opacity-80"
          style={{ fontFamily: "DM Sans", fontWeight: 400 }}
        >
          {tagline}
        </p>
      </div>
    </div>
  );
}
