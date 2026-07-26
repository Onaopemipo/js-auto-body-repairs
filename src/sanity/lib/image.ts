import imageUrlBuilder from "@sanity/image-url";

import { client } from "./client";

const builder = imageUrlBuilder(client);

type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlForSanityImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
