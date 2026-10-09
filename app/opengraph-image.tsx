import { getSiteConfig, DEFAULT_SITE_CONFIG } from "@/lib/cms";
import { loadOgFonts } from "@/lib/seo/og-fonts";
import { renderDefaultOgImage } from "@/components/og/render-default-og";
export const alt = "Imagem de partilha do portfólio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const site = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const fonts = await loadOgFonts();
  return renderDefaultOgImage(site, fonts);
}
