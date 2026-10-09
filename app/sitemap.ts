import type { MetadataRoute } from "next";
import {
  getCategorySitemapEntries,
  getProjectSitemapEntries,
  getSiteConfig,
} from "@/lib/cms";
import { getSiteBaseUrl } from "@/lib/site-url";

function parseLastModified(value?: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteBaseUrl() || "http://localhost:3000";
  const [config, categoryRows, projectRows] = await Promise.all([
    getSiteConfig(),
    getCategorySitemapEntries(),
    getProjectSitemapEntries(),
  ]);

  const siteUpdated = parseLastModified(config?._updatedAt);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: siteUpdated ?? new Date(),
    },
    {
      url: `${base}/menu`,
      lastModified: siteUpdated ?? new Date(),
    },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categoryRows.map((row) => ({
    url: `${base}/categoria/${row.slug}`,
    lastModified: parseLastModified(row.lastModified) ?? siteUpdated,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectRows.map((row) => ({
    url: `${base}/projeto/${row.slug}`,
    lastModified: parseLastModified(row.lastModified),
  }));

  return [...staticEntries, ...categoryEntries, ...projectEntries];
}
