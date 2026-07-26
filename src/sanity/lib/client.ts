import { createClient } from "next-sanity";

import { sanityApiVersion, sanityDataset, sanityProjectId } from "../env";

export const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
});

export const sanityClient = client;
