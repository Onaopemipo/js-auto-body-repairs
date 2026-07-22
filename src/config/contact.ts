export interface BusinessHoursEntry {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  schemaDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  opens: string | null;
  closes: string | null;
  display: string;
}

const encodedAddress = "816+German+Church+Road,+Redland+Bay+QLD+4165";

export const contactConfig = {
  businessName: "JS Auto Body Repairs",

  address: {
    street: "816 German Church Road",
    suburb: "Redland Bay",
    state: "QLD",
    postcode: "4165",
    country: "Australia",
    countryCode: "AU",
    formatted: "816 German Church Road, Redland Bay QLD 4165",
  },

  phone: {
    display: "0410 466 916",
    href: "tel:0410466916",
    international: "+61410466916",
  },

  timeZone: "Australia/Brisbane",

  maps: {
    embedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
    searchUrl: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
  },

  hours: [
    {
      day: "Monday",
      schemaDay: "Monday",
      opens: "08:30",
      closes: "16:30",
      display: "8:30 AM – 4:30 PM",
    },
    {
      day: "Tuesday",
      schemaDay: "Tuesday",
      opens: "08:30",
      closes: "16:30",
      display: "8:30 AM – 4:30 PM",
    },
    {
      day: "Wednesday",
      schemaDay: "Wednesday",
      opens: "08:30",
      closes: "16:30",
      display: "8:30 AM – 4:30 PM",
    },
    {
      day: "Thursday",
      schemaDay: "Thursday",
      opens: "08:30",
      closes: "16:30",
      display: "8:30 AM – 4:30 PM",
    },
    {
      day: "Friday",
      schemaDay: "Friday",
      opens: "08:30",
      closes: "16:30",
      display: "8:30 AM – 4:30 PM",
    },
    {
      day: "Saturday",
      schemaDay: "Saturday",
      opens: null,
      closes: null,
      display: "Closed",
    },
    {
      day: "Sunday",
      schemaDay: "Sunday",
      opens: null,
      closes: null,
      display: "Closed",
    },
  ] satisfies BusinessHoursEntry[],
} as const;
