import type { ProjectContentBlock } from "@/types/sanity";
import { portableTextToPlain } from "@/lib/portable-plain";

/** Primeiro bloco de texto para meta description / SEO. */
export function extractPlainFromProjectContent(
  blocks: ProjectContentBlock[],
  max = 200
): string {
  for (const block of blocks) {
    if (block._type === "projectText" && block.body?.length) {
      return portableTextToPlain(block.body, max);
    }
  }
  return "";
}
