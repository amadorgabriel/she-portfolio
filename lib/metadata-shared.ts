import type { Metadata } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";

export function defaultMetadataBase(): Metadata["metadataBase"] {
  const b = getSiteBaseUrl();
  if (!b) return undefined;
  try {
    return new URL(b);
  } catch {
    return undefined;
  }
}
