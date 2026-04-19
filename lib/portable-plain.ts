import type { PortableTextBlock } from "@portabletext/types";

/** Extrai texto simples para meta description (melhor esforço). */
export function portableTextToPlain(blocks: PortableTextBlock[] | undefined, max = 200): string {
  if (!blocks?.length) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    if (block._type !== "block" || !("children" in block) || !Array.isArray(block.children)) continue;
    for (const child of block.children as Array<{ text?: string }>) {
      if (typeof child.text === "string") parts.push(child.text);
    }
  }
  const s = parts.join(" ").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}
