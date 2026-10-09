import type { ReactElement } from "react";
import { ImageResponse } from "next/og";
import type { SiteConfig } from "@/types/sanity";
import {
  ACTIVE_DEFAULT_OG_VARIANT,
  type DefaultOgVariantId,
} from "@/lib/seo/default-og-variant";
import { ogBrandName, ogTagline } from "@/lib/seo/og-copy";
import type { OgFont } from "@/lib/seo/og-fonts";
import { EditorialOgImage } from "@/components/og/image-response/EditorialOg";
import { AtelierOgImage } from "@/components/og/image-response/AtelierOg";
import { ImprintOgImage } from "@/components/og/image-response/ImprintOg";

const RENDERERS: Record<
  DefaultOgVariantId,
  (props: { brandName: string; tagline: string }) => ReactElement
> = {
  editorial: EditorialOgImage,
  atelier: AtelierOgImage,
  imprint: ImprintOgImage,
};

export function renderDefaultOgImage(site: SiteConfig, fonts: OgFont[]) {
  const content = {
    brandName: ogBrandName(site),
    tagline: ogTagline(site),
  };
  const View = RENDERERS[ACTIVE_DEFAULT_OG_VARIANT];
  return new ImageResponse(<View {...content} />, {
    width: 1200,
    height: 630,
    fonts,
  });
}
