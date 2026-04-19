/**
 * Sanity CMS Configuration
 * https://www.sanity.io/docs/config
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y2k-fashion-portfolio";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export default defineConfig({
  name: "default",
  title: "Y2K Fashion Portfolio",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemas,
  },
});
