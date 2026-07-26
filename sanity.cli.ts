import { defineCliConfig } from "sanity/cli";

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

export default defineCliConfig({
  api: {
    projectId: requireEnvironmentValue(
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      "NEXT_PUBLIC_SANITY_PROJECT_ID",
    ),

    dataset: requireEnvironmentValue(
      process.env.NEXT_PUBLIC_SANITY_DATASET,
      "NEXT_PUBLIC_SANITY_DATASET",
    ),
  },

  studioHost: "js-auto-body-repairs",
});
