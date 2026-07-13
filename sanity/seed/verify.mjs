/**
 * Smoke-check do dataset após seed.
 * Uso: node sanity/seed/verify.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(join(root, ".env.local"));
loadEnvFile(join(root, ".env"));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const result = await client.fetch(`{
  "siteConfig": *[_type == "siteConfig"]{siteTitle, brandName, ctaLabel},
  "categories": count(*[_type == "category"]),
  "projects": count(*[_type == "project"]),
  "catSlugs": *[_type == "category"] | order(order asc){title, "slug": slug.current, order},
  "projectSlugs": *[_type == "project"] | order(order asc){title, "slug": slug.current, year}
}`);

console.log(JSON.stringify(result, null, 2));
