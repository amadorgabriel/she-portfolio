import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/cms";
import { getSiteBaseUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteBaseUrl() || "http://localhost:3000";
  const slugs = await getAllProjectSlugs();

  const staticPaths = ["", "/projetos", "/sobre", "/contato"] as const;

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.85,
  }));

  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/projetos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
