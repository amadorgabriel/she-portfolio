/**
 * Sanity CMS Configuration
 * https://www.sanity.io/docs/config
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { schemas } from "./schemas";
import { structure } from "./structure";
import { withVideoLibraryHelp } from "./components/VideoLibraryTool";

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
  plugins: [structureTool({ structure }), visionTool(), muxInput()],
  schema: {
    types: schemas,
  },
  tools: (prev) =>
    prev.map((tool) =>
      tool.name === "mux"
        ? {
            ...tool,
            title: "Biblioteca de vídeos",
            component: withVideoLibraryHelp(tool.component),
          }
        : tool,
    ),
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType !== "siteConfig") return prev;
      return prev.filter(
        (action) => action.action !== "delete" && action.action !== "duplicate",
      );
    },
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "siteConfig"),
  },
});
