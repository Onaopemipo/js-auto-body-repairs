import type { StructureResolver } from "sanity/structure";

export const singletonDocumentId = "siteSettings";

export const singletonDocumentTypes = new Set<string>(["siteSettings"]);

export const structure: StructureResolver = (builder) =>
  builder
    .list()
    .title("JS Auto Body Repairs")
    .items([
      builder
        .listItem()
        .title("Gallery Projects")
        .schemaType("galleryProject")
        .child(
          builder.documentTypeList("galleryProject").title("Gallery Projects"),
        ),

      builder
        .listItem()
        .title("Testimonials")
        .schemaType("testimonial")
        .child(builder.documentTypeList("testimonial").title("Testimonials")),

      builder.divider(),

      builder
        .listItem()
        .id(singletonDocumentId)
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(
          builder
            .document()
            .schemaType("siteSettings")
            .documentId(singletonDocumentId)
            .title("Site Settings"),
        ),
    ]);
