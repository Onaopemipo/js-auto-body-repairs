import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

const serviceOptions = [
  {
    title: "Collision repairs",
    value: "collision-repairs",
  },
  {
    title: "Paint refinishing",
    value: "paint-refinishing",
  },
  {
    title: "Dent removal",
    value: "dent-removal",
  },
  {
    title: "Panel restoration",
    value: "panel-restoration",
  },
  {
    title: "Other",
    value: "other",
  },
] as const;

export const galleryProjectType = defineType({
  name: "galleryProject",
  title: "Gallery Project",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Project",
      default: true,
    },
    {
      name: "media",
      title: "Images",
    },
    {
      name: "publishing",
      title: "Publishing",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().min(5).max(100),
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "serviceCategory",
      title: "Service category",
      type: "string",
      group: "content",
      options: {
        list: [...serviceOptions],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "vehicle",
      title: "Vehicle",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "year",
          title: "Year",
          type: "number",
          validation: (rule) =>
            rule
              .integer()
              .min(1900)
              .max(new Date().getFullYear() + 1),
        }),

        defineField({
          name: "make",
          title: "Make",
          type: "string",
          validation: (rule) => rule.max(60),
        }),

        defineField({
          name: "model",
          title: "Model",
          type: "string",
          validation: (rule) => rule.max(60),
        }),
      ],
    }),

    defineField({
      name: "summary",
      title: "Repair summary",
      type: "text",
      group: "content",
      rows: 4,
      validation: (rule) =>
        rule.required().min(30).max(500),
    }),

    defineField({
      name: "repairDetails",
      title: "Repair details",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          lists: [
            {
              title: "Bullet",
              value: "bullet",
            },
          ],
          styles: [
            {
              title: "Normal",
              value: "normal",
            },
            {
              title: "Heading",
              value: "h3",
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "completionDate",
      title: "Completion date",
      type: "date",
      group: "content",
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          description:
            "Describe the vehicle and repair shown.",
          type: "string",
          validation: (rule) =>
            rule.required().min(10).max(160),
        }),

        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          validation: (rule) => rule.max(180),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "beforeImages",
      title: "Before images",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) =>
                rule.required().min(10).max(160),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(10),
    }),

    defineField({
      name: "afterImages",
      title: "After images",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) =>
                rule.required().min(10).max(160),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(10),
    }),

    defineField({
      name: "featured",
      title: "Feature this project",
      description:
        "Featured projects may appear on the homepage.",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "publishing",
      initialValue: 100,
      validation: (rule) =>
        rule.required().integer().min(0).max(9999),
    }),

    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "publishing",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(60),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160),
    }),
  ],

  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [
        {
          field: "displayOrder",
          direction: "asc",
        },
      ],
    },
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [
        {
          field: "publishedAt",
          direction: "desc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "serviceCategory",
      make: "vehicle.make",
      model: "vehicle.model",
    },

    prepare({
      title,
      media,
      category,
      make,
      model,
    }) {
      const vehicle = [make, model]
        .filter(Boolean)
        .join(" ");

      return {
        title,
        media,
        subtitle:
          [vehicle, category]
            .filter(Boolean)
            .join(" • ") || "Gallery project",
      };
    },
  },
});
