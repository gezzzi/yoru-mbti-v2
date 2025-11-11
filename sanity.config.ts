import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schema";
import { deskStructure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "夜の性格診断ブログ",
  projectId: projectId || "project-id",
  dataset,
  basePath: "/admin",
  plugins: [deskTool({ structure: deskStructure })],
  schema: {
    types: schemaTypes,
  },
});
