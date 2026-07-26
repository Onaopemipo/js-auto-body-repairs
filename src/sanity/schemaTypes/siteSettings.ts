import {
  defineField,
  defineType,
} from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    {
      name: "business",
      title: "Business details",
      default: true,
    },
    {
      name: "hours",
      title: "Opening hours",
    },
    {
      name: "social",
      title: "Social links",
    },
    {
      name: "notice",
      title: "Website notice",
    },
  ],

  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      group: "business",
      initialValue: "JS Auto Body Repairs",
      validation: (rule) =>
        rule.required().max(100),
    }),

    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      group: "business",
      initialValue: "0481 214 187",
      validation: (rule) =>
        rule.required().min(8).max(30),
    }),

    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "business",
      initialValue:
        "info@jsautobodyrepairs.com.au",
      validation: (rule) =>
        rule.required().email(),
    }),

    defineField({
      name: "address",
      title: "Workshop address",
      type: "string",
      group: "business",
      initialValue:
        "816 German Church Road, Redland Bay QLD 4165",
      validation: (rule) =>
        rule.required().max(180),
    }),

    defineField({
      name: "weekdayHours",
      title: "Monday–Friday hours",
      type: "string",
      group: "hours",
      initialValue: "8:30 AM – 4:30 PM",
      validation: (rule) =>
        rule.required().max(80),
    }),

    defineField({
      name: "weekendHours",
      title: "Saturday–Sunday hours",
      type: "string",
      group: "hours",
      initialValue: "Closed",
      validation: (rule) =>
        rule.required().max(80),
    }),

    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "social",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "noticeEnabled",
      title: "Show website notice",
      type: "boolean",
      group: "notice",
      initialValue: false,
    }),

    defineField({
      name: "noticeTitle",
      title: "Notice title",
      type: "string",
      group: "notice",
      hidden: ({document}) =>
        document?.noticeEnabled !== true,
      validation: (rule) => rule.max(100),
    }),

    defineField({
      name: "noticeMessage",
      title: "Notice message",
      type: "text",
      rows: 4,
      group: "notice",
      hidden: ({document}) =>
        document?.noticeEnabled !== true,
      validation: (rule) => rule.max(500),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle:
          "Business details and global website settings",
      };
    },
  },
});
