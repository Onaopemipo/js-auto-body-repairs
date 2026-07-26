"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";
import { singletonDocumentTypes, structure } from "./src/sanity/structure";

function requireEnvironmentValue(
  value: string | undefined,
  variableName: string,
) {
  const normalized = value?.trim();

  if (!normalized) {
    throw new Error(`Missing environment variable: ${variableName}`);
  }

  return normalized;
}

const projectId = requireEnvironmentValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

const dataset = requireEnvironmentValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

export default defineConfig({
  name: "js-auto-body-repairs",
  title: "JS Auto Body Repairs",

  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    templates: (templates) =>
      templates.filter(
        (template) => !singletonDocumentTypes.has(template.schemaType),
      ),
  },

  document: {
    actions: (actions, context) => {
      if (!singletonDocumentTypes.has(context.schemaType)) {
        return actions;
      }

      return actions.filter(
        ({ action }) => action !== "duplicate" && action !== "delete",
      );
    },

    newDocumentOptions: (previousOptions, context) => {
      if (context.creationContext.type !== "global") {
        return previousOptions;
      }

      return previousOptions.filter(
        (option) => !singletonDocumentTypes.has(option.templateId),
      );
    },
  },
});
