/**
 * Purge órfãos do dataset (Q4=A / DEC-SC-06).
 * Uso:
 *   node sanity/seed/purge.mjs          # dry-run (lista o que apagaria)
 *   node sanity/seed/purge.mjs --apply  # apaga de fato
 *
 * Preserva IDs do seed v2 (siteConfig, category-*, project-*).
 * Apaga: about, contact, e category/project fora do seed.
 * Não apaga assets (sanity.imageAsset) — só docs de conteúdo.
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

const KEEP_IDS = new Set([
  "siteConfig",
  "category-estilo",
  "category-estamparia",
  "category-direcao",
  "category-desenho",
  "category-modelagem",
  "project-floral",
  "project-besora",
  "project-estampa-i",
  "project-direcao-lookbook",
  "project-desenhos",
  "project-modelagem-prototipo",
]);

const LEGACY_TYPES = new Set(["about", "contact"]);
const CONTENT_TYPES = new Set(["about", "contact", "category", "project", "siteConfig"]);

const apply = process.argv.includes("--apply");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!token) {
  console.error("Falta SANITY_API_TOKEN (write)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function baseId(id) {
  return id.replace(/^drafts\./, "");
}

async function main() {
  console.log(
    `Purge → project=${projectId} dataset=${dataset} mode=${apply ? "APPLY" : "dry-run"}`
  );

  const docs = await client.fetch(
    `*[_type in $types]{_id, _type, "slug": slug.current, title, name}`,
    { types: [...CONTENT_TYPES] }
  );

  const toDelete = [];
  const toKeep = [];

  for (const doc of docs) {
    const id = baseId(doc._id);
    const reason =
      LEGACY_TYPES.has(doc._type)
        ? `legacy type ${doc._type}`
        : doc._type === "siteConfig" && id !== "siteConfig"
          ? "extra siteConfig"
          : (doc._type === "category" || doc._type === "project") &&
              !KEEP_IDS.has(id)
            ? "not in v2 seed allowlist"
            : null;

    if (reason) {
      toDelete.push({ ...doc, reason });
    } else if (KEEP_IDS.has(id) || (doc._type === "siteConfig" && id === "siteConfig")) {
      toKeep.push(doc);
    } else {
      toKeep.push(doc);
    }
  }

  console.log("\nKEEP:");
  for (const d of toKeep) {
    console.log(`  ${d._id}  ${_typeLabel(d)}`);
  }

  console.log("\nDELETE:");
  if (toDelete.length === 0) {
    console.log("  (nenhum)");
  } else {
    for (const d of toDelete) {
      console.log(`  ${d._id}  ${_typeLabel(d)}  — ${d.reason}`);
    }
  }

  if (!apply) {
    console.log("\nDry-run only. Reexecute with --apply to delete.");
    return;
  }

  if (toDelete.length === 0) {
    console.log("\nNothing to delete.");
    return;
  }

  const tx = client.transaction();
  for (const d of toDelete) {
    tx.delete(d._id);
  }
  await tx.commit();
  console.log(`\nDeleted ${toDelete.length} document(s).`);
}

function _typeLabel(d) {
  const label = d.title || d.name || d.slug || "";
  return `${d._type}${label ? ` (${label})` : ""}`;
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
