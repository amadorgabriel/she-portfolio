import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Tipo local para imagens do Sanity
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// Configuração do cliente Sanity
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Cliente para queries públicas (ISR/cache)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN para dados públicos (mais rápido)
  perspective: "published",
});

// Cliente para preview/drafts (server-side only)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Não usar CDN para previews
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});

// Builder de URLs de imagem
const builder = imageUrlBuilder(client);

/**
 * Gera URL otimizada para imagens do Sanity
 * @param source - Source da imagem do Sanity
 * @param options - Opções de otimização (width, height, quality, etc)
 * @returns URL da imagem otimizada
 *
 * @example
 * urlFor(image).width(800).height(600).format('webp').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Helper para gerar URL de imagem com opções comuns
 */
export function getImageUrl(
  source: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpg" | "png";
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  } = {}
) {
  const { width = 800, height, quality = 80, format = "webp", fit = "crop" } = options;

  let imageBuilder = builder.image(source).quality(quality).format(format);

  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  if (fit) imageBuilder = imageBuilder.fit(fit);

  return imageBuilder.url();
}

/**
 * Verifica se o cliente está configurado corretamente
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}
