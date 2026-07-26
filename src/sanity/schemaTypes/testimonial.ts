import {
  defineField,
  defineType,
} from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",

  fields: [
    defineField({
      name: "customerName",
      title: "Customer name",
      type: "string",
      validation: (rule) =>
        rule.required().min(2).max(80),
    }),

    defineField({
      name: "review",
      title: "Review",
      type: "text",
      rows: 6,
      validation: (rule) =>
        rule.required().min(20).max(1000),
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
      options: {
        list: [
          {title: "5 stars", value: 5},
          {title: "4 stars", value: 4},
          {title: "3 stars", value: 3},
          {title: "2 stars", value: 2},
          {title: "1 star", value: 1},
        ],
        layout: "radio",
      },
      validation: (rule) =>
        rule.required().integer().min(1).max(5),
    }),

    defineField({
      name: "source",
      title: "Review source",
      type: "string",
      options: {
        list: [
          {
            title: "Google",
            value: "google",
          },
          {
            title: "Facebook",
            value: "facebook",
          },
          {
            title: "Direct customer feedback",
            value: "direct",
          },
          {
            title: "Other",
            value: "other",
          },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "service",
      title: "Service received",
      type: "string",
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "reviewDate",
      title: "Review date",
      type: "date",
    }),

    defineField({
      name: "featured",
      title: "Feature this testimonial",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 100,
      validation: (rule) =>
        rule.required().integer().min(0).max(9999),
    }),

    defineField({
      name: "published",
      title: "Published",
      description:
        "Only published testimonials should appear on the website.",
      type: "boolean",
      initialValue: true,
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
      title: "Newest review first",
      name: "reviewDateDesc",
      by: [
        {
          field: "reviewDate",
          direction: "desc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "customerName",
      rating: "rating",
      source: "source",
      featured: "featured",
      published: "published",
    },

    prepare({
      title,
      rating,
      source,
      featured,
      published,
    }) {
      const stars = "★".repeat(
        Number(rating || 0),
      );

      const states = [
        source,
        featured ? "Featured" : null,
        published ? "Published" : "Hidden",
      ]
        .filter(Boolean)
        .join(" • ");

      return {
        title,
        subtitle: `${stars} • ${states}`,
      };
    },
  },
});
