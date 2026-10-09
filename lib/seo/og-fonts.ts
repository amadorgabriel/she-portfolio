import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700;
  style: "normal";
};

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return Uint8Array.from(buf).buffer;
}

async function readFont(relativePath: string): Promise<ArrayBuffer | null> {
  try {
    const file = await readFile(relativePath);
    return toArrayBuffer(file);
  } catch {
    return null;
  }
}

/** Fontes locais (@fontsource) para Satori — sem dependência de rede no build. */
export async function loadOgFonts(): Promise<OgFont[]> {
  const root = process.cwd();
  const dmRoot = join(root, "node_modules", "@fontsource", "dm-sans", "files");
  const cgRoot = join(
    root,
    "node_modules",
    "@fontsource",
    "cormorant-garamond",
    "files"
  );

  const [dm400, dm500, cg500] = await Promise.all([
    readFont(join(dmRoot, "dm-sans-latin-400-normal.woff")),
    readFont(join(dmRoot, "dm-sans-latin-500-normal.woff")),
    readFont(join(cgRoot, "cormorant-garamond-latin-500-normal.woff")),
  ]);

  const fonts: OgFont[] = [];
  if (dm400) {
    fonts.push({ name: "DM Sans", data: dm400, weight: 400, style: "normal" });
  }
  if (dm500) {
    fonts.push({ name: "DM Sans", data: dm500, weight: 500, style: "normal" });
  }
  if (cg500) {
    fonts.push({
      name: "Cormorant Garamond",
      data: cg500,
      weight: 500,
      style: "normal",
    });
  }

  if (!fonts.length) {
    throw new Error("OG fonts missing: install @fontsource/dm-sans and cormorant-garamond");
  }

  return fonts;
}
