import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const sourcePath = path.resolve(
  "public/brand/source/js-auto-body-logo-original.jpeg",
);

const outputDirectory = path.resolve("public/brand/generated");

if (!fs.existsSync(sourcePath)) {
  console.error(`Missing source logo: ${sourcePath}`);
  process.exit(1);
}

fs.mkdirSync(outputDirectory, {
  recursive: true,
});

const sourceImage = sharp(sourcePath);

const metadata = await sourceImage.metadata();

if (!metadata.width || !metadata.height) {
  console.error("Unable to read logo dimensions.");
  process.exit(1);
}

const { data, info } = await sourceImage.ensureAlpha().raw().toBuffer({
  resolveWithObject: true,
});

let minX = info.width;
let minY = info.height;
let maxX = -1;
let maxY = -1;

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const index = (y * info.width + x) * 4;

    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];

    const brightness = red * 0.299 + green * 0.587 + blue * 0.114;

    const colourSpread =
      Math.max(red, green, blue) - Math.min(red, green, blue);

    let alpha = 255;

    if (brightness >= 248 && colourSpread <= 12) {
      alpha = 0;
    } else if (brightness >= 225 && colourSpread <= 32) {
      alpha = Math.round(((248 - brightness) / 23) * 255);
    }

    data[index + 3] = Math.max(0, Math.min(255, alpha));

    if (data[index + 3] > 18) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

if (maxX < minX || maxY < minY) {
  console.error("No visible logo artwork was detected.");
  process.exit(1);
}

const horizontalPadding = Math.round(info.width * 0.02);

const verticalPadding = Math.round(info.height * 0.025);

const left = Math.max(0, minX - horizontalPadding);

const top = Math.max(0, minY - verticalPadding);

const right = Math.min(info.width - 1, maxX + horizontalPadding);

const bottom = Math.min(info.height - 1, maxY + verticalPadding);

const width = right - left + 1;
const height = bottom - top + 1;

if (
  width < 1 ||
  height < 1 ||
  left < 0 ||
  top < 0 ||
  left + width > info.width ||
  top + height > info.height
) {
  console.error("Calculated crop is invalid.", {
    sourceWidth: info.width,
    sourceHeight: info.height,
    left,
    top,
    width,
    height,
  });

  process.exit(1);
}

const croppedLogoBuffer = await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .extract({
    left,
    top,
    width,
    height,
  })
  .png()
  .toBuffer();

await sharp(croppedLogoBuffer)
  .resize({
    width: 1600,
    withoutEnlargement: true,
  })
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
  })
  .toFile(path.join(outputDirectory, "js-auto-body-logo.png"));

await sharp(croppedLogoBuffer)
  .resize({
    width: 1000,
    withoutEnlargement: true,
  })
  .webp({
    quality: 94,
    alphaQuality: 100,
  })
  .toFile(path.join(outputDirectory, "js-auto-body-logo.webp"));

await sharp(croppedLogoBuffer)
  .resize({
    width: 600,
    withoutEnlargement: true,
  })
  .png({
    compressionLevel: 9,
  })
  .toFile(path.join(outputDirectory, "js-auto-body-logo-header.png"));

/*
 * Temporary square brand asset.
 * This uses the complete logo because the source does not
 * provide a clean standalone icon.
 */
await sharp(croppedLogoBuffer)
  .resize({
    width: 512,
    height: 512,
    fit: "contain",
    background: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
  })
  .png({
    compressionLevel: 9,
  })
  .toFile(path.join(outputDirectory, "js-auto-body-mark.png"));

await sharp(croppedLogoBuffer)
  .resize({
    width: 192,
    height: 192,
    fit: "contain",
    background: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
  })
  .png({
    compressionLevel: 9,
  })
  .toFile(path.join(outputDirectory, "apple-touch-icon.png"));

await sharp(croppedLogoBuffer)
  .resize({
    width: 64,
    height: 64,
    fit: "contain",
    background: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
  })
  .png({
    compressionLevel: 9,
  })
  .toFile(path.join(outputDirectory, "favicon-64.png"));

console.log(
  JSON.stringify(
    {
      source: {
        width: info.width,
        height: info.height,
      },
      crop: {
        left,
        top,
        width,
        height,
      },
      generated: [
        "js-auto-body-logo.png",
        "js-auto-body-logo.webp",
        "js-auto-body-logo-header.png",
        "js-auto-body-mark.png",
        "apple-touch-icon.png",
        "favicon-64.png",
      ],
      warning: "Square assets currently contain the full horizontal logo.",
    },
    null,
    2,
  ),
);
