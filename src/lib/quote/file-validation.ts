const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export const quoteFileLimits = {
  maximumFiles: 5,
  maximumFileBytes: 8 * 1024 * 1024,
  maximumTotalBytes: 20 * 1024 * 1024,
} as const;

export interface ValidatedQuoteFile {
  filename: string;
  contentType: string;
  content: Buffer;
}

function createSafeFilename(originalName: string) {
  const cleaned = originalName
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

  return cleaned || "vehicle-photo";
}

export async function validateQuoteFiles(
  files: File[],
): Promise<ValidatedQuoteFile[]> {
  if (files.length > quoteFileLimits.maximumFiles) {
    throw new Error(
      `Upload no more than ${quoteFileLimits.maximumFiles} photos.`,
    );
  }

  let totalBytes = 0;

  const validatedFiles: ValidatedQuoteFile[] = [];

  for (const file of files) {
    if (file.size === 0) {
      continue;
    }

    if (!allowedImageTypes.has(file.type)) {
      throw new Error(`${file.name}: unsupported image format.`);
    }

    if (file.size > quoteFileLimits.maximumFileBytes) {
      throw new Error(`${file.name}: each photo must be 8 MB or smaller.`);
    }

    totalBytes += file.size;

    if (totalBytes > quoteFileLimits.maximumTotalBytes) {
      throw new Error("The combined photo size must be 20 MB or smaller.");
    }

    validatedFiles.push({
      filename: createSafeFilename(file.name),
      contentType: file.type,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  return validatedFiles;
}
