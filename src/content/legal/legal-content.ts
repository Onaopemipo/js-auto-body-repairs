import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const legalContent = {
  effectiveDate: "22 July 2026",

  business: {
    name: contactConfig.businessName,
    address: contactConfig.address.formatted,
    phone: contactConfig.phone.display,
    phoneHref: contactConfig.phone.href,
    email: siteConfig.email,
  },

  privacy: {
    title: "Privacy Policy",
    description:
      "How JS Auto Body Repairs collects, uses, stores and protects information submitted through this website.",
  },

  terms: {
    title: "Website Terms of Use",
    description:
      "Terms governing use of the JS Auto Body Repairs website, online quote form and general website information.",
  },

  cookies: {
    title: "Cookie Policy",
    description:
      "Information about essential browser storage and cookies used by the JS Auto Body Repairs website.",
  },
} as const;
