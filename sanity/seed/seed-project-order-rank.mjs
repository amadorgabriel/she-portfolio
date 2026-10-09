/**
 * Atribui orderRank único aos projetos, na ordem atual (order, ano, título).
 * Uso: node sanity/seed/seed-project-order-rank.mjs
 *      node sanity/seed/seed-project-order-rank.mjs --apply
 */

import { createClient } from "@sanity/client";
import { LexoRank } from "lexorank";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");
const apply = process.argv.includes("--apply");

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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID e um token de escrita.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

const projects = await client.fetch(
  `*[_type == "project" && !(_id in path("drafts.**"))] | order(order asc, year desc, title asc) {
    _id,
    title,
    "category": categories[0]->title,
    order,
    year
  }`,
);

let rank = LexoRank.min();
const patches = [];
for (const project of projects) {
  rank = rank.genNext().genNext();
  const orderRank = rank.toString();
  patches.push({ id: project._id, orderRank, title: project.title, category: project.category });
  patches.push({
    id: `drafts.${project._id}`,
    orderRank,
    title: project.title,
    category: project.category,
    draft: true,
  });
}

const draftIds = new Set(
  await client.fetch(`*[_id in path("drafts.**") && _type == "project"]._id`),
);

console.log(apply ? "A aplicar ordem:" : "Dry-run. Ordem que seria gravada:");
for (const patch of patches) {
  if (patch.draft && !draftIds.has(patch.id)) continue;
  console.log(`- ${patch.title} (${patch.category || "sem categoria"}) -> ${patch.orderRank}`);
}

if (!apply) {
  console.log("\nNada foi gravado. Rode de novo com --apply.");
  process.exit(0);
}

let tx = client.transaction();
for (const patch of patches) {
  if (patch.draft && !draftIds.has(patch.id)) continue;
  tx = tx.patch(patch.id, { set: { orderRank: patch.orderRank } });
}
await tx.commit();
console.log("orderRank gravado.");
