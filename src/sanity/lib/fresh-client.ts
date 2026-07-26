import { sanityClient } from "@/sanity/lib/client";

export const freshSanityClient =
  sanityClient.withConfig({
    useCdn: false,
  });
