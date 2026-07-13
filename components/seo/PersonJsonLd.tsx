import { getSiteConfig, DEFAULT_SITE_CONFIG } from "@/lib/cms";
import { getSiteBaseUrl } from "@/lib/site-url";
import { imageUrlFromSanity } from "@/lib/sanity-image";

export async function PersonJsonLd() {
  const site = (await getSiteConfig()) ?? DEFAULT_SITE_CONFIG;
  const base = getSiteBaseUrl();
  const name = site.brandName || site.siteTitle || "Karina Reis";
  const image = site.splashLogo
    ? imageUrlFromSanity(site.splashLogo, { width: 800, height: 800 })
    : undefined;
  const imageUrl =
    image && !image.startsWith("http") && base ? `${base}${image}` : image;

  const sameAs: string[] = [];
  if (site.socialLinks?.instagram) sameAs.push(site.socialLinks.instagram);
  if (site.socialLinks?.linkedin) sameAs.push(site.socialLinks.linkedin);

  const schema = Object.fromEntries(
    Object.entries({
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      description: site.metaDescription,
      image: imageUrl,
      url: base || undefined,
      email: site.socialLinks?.email,
      sameAs: sameAs.length ? sameAs : undefined,
      jobTitle: "Designer",
    }).filter(
      ([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)
    )
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
