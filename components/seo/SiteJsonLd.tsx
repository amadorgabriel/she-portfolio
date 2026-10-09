import { getSiteConfig, DEFAULT_SITE_CONFIG } from "@/lib/cms";
import { getSiteBaseUrl } from "@/lib/site-url";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { buildSiteGraphSchema } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";

export async function SiteJsonLd() {
  const site = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const base = getSiteBaseUrl();
  if (!base) return null;

  const image = site.splashLogo
    ? imageUrlFromSanity(site.splashLogo, { width: 800, height: 800 })
    : undefined;
  const imageUrl =
    image && !image.startsWith("http") ? `${base}${image}` : image;

  return <JsonLd data={buildSiteGraphSchema(site, base, imageUrl)} />;
}
