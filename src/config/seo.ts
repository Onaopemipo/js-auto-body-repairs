import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const seoConfig = {
  title:
    "JS Auto Body Repairs | Collision Repair and Auto Refinishing in Redland Bay",

  description:
    "Panel beating, collision repair, paint refinishing, dent removal and automotive repair services from JS Auto Body Repairs in Redland Bay, Queensland.",

  socialImage: {
    url: "/media/hero/hero-desktop.webp",
    width: 2400,
    height: 1600,
    alt: "Vehicle inside the JS Auto Body Repairs workshop in Redland Bay",
  },

  business: {
    name: contactConfig.businessName,
    telephone: contactConfig.phone.international,
    address: contactConfig.address.formatted,
  },

  routes: {
    home: "/",
    services: "/services",
    gallery: "/gallery",
    about: "/about",
    testimonials: "/testimonials",
    contact: "/contact",
    quote: "/request-estimate",
  },

  keywords: [
    "panel beating Redland Bay",
    "auto body repairs Redland Bay",
    "collision repairs Redland Bay",
    "paint refinishing Redland Bay",
    "dent removal Redland Bay",
    "car repairs Redland Bay",
    siteConfig.name,
  ],
} as const;
