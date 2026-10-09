import type { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

/** Crawlers de IA permitidos para citação em respostas (AEO); ajuste se quiser bloquear treino. */
const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteBaseUrl();
  const publicAllow = {
    allow: "/",
    disallow: ["/studio/", "/api/", "/prototypes/"],
  };

  return {
    rules: [
      { userAgent: "*", ...publicAllow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, ...publicAllow })),
    ],
    sitemap: base ? `${base}/sitemap.xml` : undefined,
    host: base || undefined,
  };
}
