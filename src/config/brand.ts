export const brandConfig = {
  name: "JS Auto Body Repairs",
  shortName: "JS Auto Body",

  strapline: "Restore. Protect. Drive with confidence.",

  logo: {
    full: "/brand/generated/js-auto-body-logo.png",
    webp: "/brand/generated/js-auto-body-logo.webp",
    header: "/brand/generated/js-auto-body-logo-header.png",
    mark: "/brand/generated/js-auto-body-mark.png",
    favicon: "/brand/generated/favicon-64.png",
    appleTouch: "/brand/generated/apple-touch-icon.png",
  },

  colours: {
    performanceRed: "#E7070B",
    brightRed: "#FF171B",
    deepRed: "#A50303",

    carbonBlack: "#09090A",
    elevatedBlack: "#0F0F11",
    graphite: "#38383B",
    gunmetal: "#57575C",

    metallicSilver: "#8A8A8F",
    lightSilver: "#D0D0D3",
    workshopWhite: "#F5F5F5",
  },
} as const;

export type BrandConfig = typeof brandConfig;
