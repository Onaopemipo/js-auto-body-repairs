function requireEnvironmentValue(
  value: string | undefined,
  variableName: string,
) {
  const normalized = value?.trim();

  if (!normalized) {
    throw new Error(
      `Missing environment variable: ${variableName}`,
    );
  }

  return normalized;
}

export const sanityProjectId =
  requireEnvironmentValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
  );

export const sanityDataset =
  requireEnvironmentValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    "NEXT_PUBLIC_SANITY_DATASET",
  );

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ||
  "2026-03-01";
