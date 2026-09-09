/**
 * Sanity CMS Configuration
 * https://www.sanity.io/docs/config
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { schemas } from "./schemas";

// Use as variáveis de ambiente ou valores padrão para build
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Verificar se o projeto está configurado
if (!projectId) {
  console.warn("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID não está definido. Configure .env.local");
}

export default defineConfig({
  name: "default",
  title: "Karina Reis Portfolio",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool(), muxInput()],
  schema: {
    types: schemas,
  },
});
