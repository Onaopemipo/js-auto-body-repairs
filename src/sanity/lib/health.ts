import { defineQuery } from "next-sanity";

import { sanityClient } from "@/sanity/lib/client";

const cmsHealthQuery = defineQuery(`
  {
    "galleryProjects":
      count(*[_type == "galleryProject"]),
    "testimonials":
      count(*[_type == "testimonial"]),
    "siteSettings":
      count(*[
        _type == "siteSettings" &&
        _id == "siteSettings"
      ])
  }
`);

export async function readCmsHealth() {
  return sanityClient.fetch(cmsHealthQuery);
}
