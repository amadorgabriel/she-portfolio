/**
 * Seed Sanity — Portfólio v2 (Karina Reis)
 * Uso: node sanity/seed/seed.mjs
 *
 * Requer em .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN (write) OU SANITY_API_READ_TOKEN com permissão de Editor
 */

import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { deflateSync } from "node:zlib";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
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
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token =
  process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Falta SANITY_API_TOKEN (write) ou SANITY_API_READ_TOKEN com permissão de Editor."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/** Solid RGB PNG (Sanity image pipeline rejects most SVGs). */
function solidPng(r, g, b, width = 800, height = 1000) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x++) {
      const i = row + 1 + x * 3;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
    }
  }

  const crcTable = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
    return table;
  })();

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const typeBuf = Buffer.from(type, "ascii");
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const PLACEHOLDER_COLORS = {
  "project.png": [232, 230, 225],
  "project-1.png": [210, 200, 190],
  "project-2.png": [190, 205, 210],
  "project-3.png": [220, 205, 195],
};

function readPlaceholder(name) {
  const pngName = name.replace(/\.svg$/i, ".png");
  const rgb = PLACEHOLDER_COLORS[pngName];
  if (rgb) {
    return {
      buffer: solidPng(...rgb),
      contentType: "image/png",
      filename: pngName,
    };
  }
  const path = join(root, "public", "placeholders", name);
  if (!existsSync(path)) {
    throw new Error(`Placeholder não encontrado: ${path}`);
  }
  return {
    buffer: readFileSync(path),
    contentType: name.endsWith(".svg") ? "image/svg+xml" : "image/png",
    filename: name,
  };
}

async function uploadAsset(file, label) {
  const asset = await client.assets.upload("image", file.buffer, {
    filename: file.filename,
    contentType: file.contentType,
  });
  console.log(`  asset ${label}: ${asset._id}`);
  return asset;
}

function imageRef(assetId, alt, caption) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
    ...(caption ? { caption } : {}),
  };
}

function portableText(text) {
  return [
    {
      _type: "block",
      _key: createHash("md5").update(text).digest("hex").slice(0, 12),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "s1",
          text,
          marks: [],
        },
      ],
    },
  ];
}

const CATEGORIES = [
  {
    id: "category-estilo",
    title: "Estilo",
    slug: "estilo",
    order: 1,
  },
  {
    id: "category-estamparia",
    title: "Estamparia",
    slug: "estamparia",
    order: 2,
  },
  {
    id: "category-direcao",
    title: "Direção",
    slug: "direcao",
    order: 3,
  },
  {
    id: "category-desenho",
    title: "Desenho",
    slug: "desenho",
    order: 4,
  },
  {
    id: "category-modelagem",
    title: "Modelagem",
    slug: "modelagem",
    order: 5,
  },
];

const PROJECTS = [
  {
    id: "project-floral",
    title: "Floral",
    slug: "floral",
    categoryId: "category-estilo",
    year: 2023,
    order: 1,
    thumb: "project-1.png",
    gallery: ["project-1.png", "project-2.png"],
    description:
      "Projeto de estilo com referências florais — placeholder para demo.",
  },
  {
    id: "project-besora",
    title: "Besora",
    slug: "besora",
    categoryId: "category-estilo",
    year: 2022,
    order: 2,
    thumb: "project-2.png",
    gallery: ["project-2.png", "project-3.png"],
    description: "Série Besora — lookbook de estilo (seed).",
  },
  {
    id: "project-estampa-i",
    title: "Estampa I",
    slug: "estampa-i",
    categoryId: "category-estamparia",
    year: 2023,
    order: 1,
    thumb: "project-3.png",
    gallery: ["project-3.png", "project.png"],
    description: "Estampa experimental I — placeholder.",
  },
  {
    id: "project-direcao-lookbook",
    title: "Direção Lookbook",
    slug: "direcao-lookbook",
    categoryId: "category-direcao",
    year: 2024,
    order: 1,
    thumb: "project.png",
    gallery: ["project.png", "project-1.png"],
    description: "Direção de arte para lookbook (seed).",
  },
  {
    id: "project-desenhos",
    title: "Desenhos",
    slug: "desenhos",
    categoryId: "category-desenho",
    year: 2021,
    order: 1,
    thumb: "project-1.png",
    gallery: ["project-1.png"],
    description: "Seleção de desenhos — placeholder.",
  },
  {
    id: "project-modelagem-prototipo",
    title: "Modelagem Protótipo",
    slug: "modelagem-prototipo",
    categoryId: "category-modelagem",
    year: 2022,
    order: 1,
    thumb: "project-2.png",
    gallery: ["project-2.png", "project-3.png"],
    description: "Protótipo de modelagem (seed).",
  },
];

async function main() {
  console.log(`Seed → project=${projectId} dataset=${dataset}`);
  console.log(
    `Token source: ${process.env.SANITY_API_TOKEN ? "SANITY_API_TOKEN" : "SANITY_API_READ_TOKEN"}`
  );

  // Permission smoke-check
  try {
    await client.fetch("count(*[_type == 'siteConfig'])");
  } catch (err) {
    console.error("Falha ao ler dataset:", err.message);
    process.exit(1);
  }

  console.log("\n1) Uploading placeholders…");
  const assetCache = new Map();
  async function getAsset(filename) {
    if (assetCache.has(filename)) return assetCache.get(filename);
    const file = readPlaceholder(filename);
    const asset = await uploadAsset(file, filename);
    assetCache.set(filename, asset);
    return asset;
  }

  for (const name of [
    "project.png",
    "project-1.png",
    "project-2.png",
    "project-3.png",
  ]) {
    await getAsset(name);
  }

  console.log("\n2) siteConfig…");
  await client.createOrReplace({
    _id: "siteConfig",
    _type: "siteConfig",
    siteTitle: "Karina Reis",
    brandName: "Karina Reis",
    metaDescription:
      "Portfólio de Karina Reis — estilo, estamparia, direção, desenho e modelagem.",
    ctaLabel: "ABRIR",
    socialLinks: {
      linkedin: "https://www.linkedin.com/",
      instagram: "https://www.instagram.com/",
      email: "contato@karinareis.example",
    },
  });
  console.log("  siteConfig OK");

  console.log("\n3) categories…");
  for (const cat of CATEGORIES) {
    await client.createOrReplace({
      _id: cat.id,
      _type: "category",
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
      order: cat.order,
    });
    console.log(`  ${cat.slug} OK`);
  }

  console.log("\n4) projects…");
  for (const p of PROJECTS) {
    const thumbAsset = await getAsset(p.thumb);
    const galleryAssets = [];
    for (const g of p.gallery) {
      galleryAssets.push(await getAsset(g));
    }

    await client.createOrReplace({
      _id: p.id,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      categories: [
        {
          _type: "reference",
          _ref: p.categoryId,
          _key: p.categoryId,
        },
      ],
      thumbnail: imageRef(thumbAsset._id, `Thumbnail ${p.title}`),
      gallery: galleryAssets.map((a, i) => ({
        ...imageRef(a._id, `${p.title} — imagem ${i + 1}`),
        _key: `g${i + 1}`,
      })),
      description: portableText(p.description),
      year: p.year,
      order: p.order,
    });
    console.log(`  ${p.slug} OK`);
  }

  const counts = await client.fetch(`{
    "siteConfig": count(*[_type == "siteConfig"]),
    "categories": count(*[_type == "category"]),
    "projects": count(*[_type == "project"])
  }`);

  console.log("\nSeed concluído.", counts);
}

main().catch((err) => {
  console.error("\nSeed falhou:", err.message || err);
  if (String(err.message || err).includes("Insufficient permissions")) {
    console.error(
      "\nCrie um token com permissão Editor/Admin em https://www.sanity.io/manage e defina SANITY_API_TOKEN em .env.local"
    );
  }
  process.exit(1);
});
