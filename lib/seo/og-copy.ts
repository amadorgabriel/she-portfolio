import type { SiteConfig } from "@/types/sanity";

export function ogBrandName(site: SiteConfig): string {
  return site.brandName || site.siteTitle || "Karina Reis";
}

export function ogTagline(site: SiteConfig): string {
  return (
    site.metaDescription?.trim() ||
    "Design, estamparia e direção criativa"
  );
}
