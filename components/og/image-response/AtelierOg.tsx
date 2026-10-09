import type { OgTemplateContent } from "@/components/og/types";

export function AtelierOgImage({ brandName, tagline }: OgTemplateContent) {
  return (
    <div tw="flex w-full h-full bg-[#f7f6f3] text-[#1a1a1a] relative overflow-hidden">
      <div
        tw="absolute flex"
        style={{
          top: -80,
          right: -40,
          width: 420,
          height: 420,
          border: "1px solid #d8d6d1",
          transform: "rotate(12deg)",
        }}
      />
      <div tw="flex flex-col flex-1 justify-between p-20">
        <p
          tw="text-[20px] uppercase"
          style={{ fontFamily: "DM Sans", fontWeight: 500, letterSpacing: "0.4em" }}
        >
          {brandName} · Estúdio
        </p>
        <div tw="flex flex-col max-w-[780px]">
          <h1
            tw="text-[88px] leading-[0.95] font-medium"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            {brandName}
          </h1>
          <p
            tw="text-[26px] mt-8 leading-snug opacity-75 max-w-[640px]"
            style={{ fontFamily: "DM Sans" }}
          >
            {tagline}
          </p>
        </div>
        <p
          tw="text-[18px] uppercase opacity-50"
          style={{ fontFamily: "DM Sans", letterSpacing: "0.25em" }}
        >
          karinareis.com
        </p>
      </div>
    </div>
  );
}
