import { contactConfig } from "@/config/contact";

export const siteContent = {
  business: {
    name: contactConfig.businessName,
    location: `${contactConfig.address.suburb}, Queensland`,
    address: contactConfig.address.formatted,
    phoneDisplay: contactConfig.phone.display,
    phoneHref: contactConfig.phone.href,
    hours: {
      weekdays: "Monday – Friday: 8:30am – 4:30pm",
    },
  },
  home: {
    hero: {
      headline: "Panel Beating & Auto Refinishing, Done Right the First Time",
      subheadline:
        "Redland Bay's trusted collision repair and paint specialists — restoring vehicles to factory standard, every time.",
      primaryCta: "Get a Free Quote",
      secondaryCta: "View Our Work",
    },
    intro: {
      title: "Local expertise. Factory-standard results.",
      body: "JS Auto Body Repairs is a locally owned panel beating and auto refinishing shop based in Redland Bay, Queensland. We specialise in collision repairs, paint refinishing, and dent removal — restoring vehicles to factory standard with the kind of care and attention you would want for your own car. From minor dents to major collision damage, our team brings the experience, precision, and honesty this community has come to rely on.",
    },
    whyChooseUs: [
      "Locally owned and operated in Redland Bay",
      "Factory-standard repairs and finishes",
      "Honest communication and fast turnaround",
      "Trusted by the local community for years",
    ],
    featuredReview: {
      quote:
        "Great workmanship, good communication, prompt and professional. Highly recommend.",
      author: "Jill Greenway — Google Review",
    },
  },
  about: {
    heroTitle: "Craftsmanship, honesty and local service.",
    heroDescription:
      "A dedicated Redland Bay workshop focused on repairing vehicles properly, communicating clearly and delivering work to a high standard.",
    storyTitle: "Our story",
    story:
      "JS Auto Body Repairs is a dedicated panel beating and auto refinishing shop located in Redland Bay, Queensland. We specialise in collision repairs, paint refinishing, and dent removal, with every job carried out to factory standard. Led by Sam, our workshop has built its reputation the old-fashioned way — through careful craftsmanship, honest communication, and treating every vehicle like it is our own. Whether it is a straightforward repair or a more complex restoration, our customers keep coming back because they know the job will be done properly, on time, and at a fair price.",
    approachTitle: "Our approach",
    approach:
      "We believe quality auto body repair comes down to three things: expertise, efficiency, and genuine care for the customer. From your first phone call to the moment you drive away, our focus is on making the process simple and stress-free — and making sure your vehicle looks and performs exactly as it should.",
    differentiators: [
      {
        title: "Local expertise",
        description: "Proudly serving Redland Bay and the surrounding area.",
      },
      {
        title: "Attention to detail",
        description:
          "Every panel and every finish is inspected before handover.",
      },
      {
        title: "Fast turnaround",
        description:
          "We understand that you need your vehicle back on the road.",
      },
      {
        title: "Honest, friendly service",
        description: "No jargon, no surprises — just clear communication.",
      },
    ],
  },
  services: [
    {
      slug: "collision-repairs",
      title: "Collision Repairs",
      summary:
        "Full structural and panel repairs for vehicles of any make or model.",
      description:
        "Our technicians assess the damage thoroughly and restore your vehicle's structural integrity and appearance to factory standard.",
    },
    {
      slug: "paint-refinishing",
      title: "Paint Refinishing",
      summary: "Precise colour matching and factory-standard spray painting.",
      description:
        "Whether it is a single panel or a full respray, we take the time to achieve a seamless match with your vehicle's original finish.",
    },
    {
      slug: "dent-removal",
      title: "Dent Removal",
      summary: "Precision hail and dent repair techniques.",
      description:
        "We restore damaged panels while preserving the original finish wherever possible, helping save time and avoid unnecessary repainting.",
    },
    {
      slug: "performance-upgrades",
      title: "Performance Upgrades",
      summary: "Performance and cosmetic upgrades tailored to your vehicle.",
      description:
        "Looking to upgrade your vehicle? We can accommodate a range of performance and cosmetic improvements to suit your needs.",
    },
    {
      slug: "routine-maintenance",
      title: "Routine Maintenance",
      summary: "Regular maintenance and vehicle check-ups.",
      description:
        "Keep your vehicle in top condition with routine maintenance, because prevention is always easier than repair.",
    },
    {
      slug: "complex-repairs",
      title: "Complex Repairs",
      summary: "Practical solutions for difficult or unusual repair work.",
      description:
        "Every case is different. Whatever the challenge, our experienced technicians will find the right solution to get your vehicle back to its best.",
    },
    {
      slug: "car-ac-regas",
      title: "Car AC Regas",
      summary: "Air conditioning leak checks and refrigerant regas.",
      description:
        "Stay cool on the road with a full air conditioning regas. We check the system for leaks, top up refrigerant and get your AC blowing cold again.",
    },
  ],
  gallery: {
    title: "Our work",
    description:
      "Every vehicle that comes through our workshop receives the same level of care — from panel repairs and dent removal to full paint refinishing. This gallery will showcase recent repairs and the standard of craftsmanship customers can expect.",
    categories: ["Collision Repairs", "Paint Refinishing", "Dent Removal"],
  },
  testimonials: [
    {
      quote:
        "My car has never run better. The service was fast, efficient, and affordable — I'd recommend them to anyone.",
      author: "Patrick",
    },
    {
      quote:
        "After weeks of trouble with my car, JS Auto Body Repairs was the only shop that could get it right. True experts in everything automotive.",
      author: "Carol Jennings",
    },
    {
      quote:
        "I've been a customer for years, and the quality has never dropped. Five-star service from day one.",
      author: "Abass",
    },
    {
      quote:
        "Sam did a fantastic job renovating my jet-ski trailer — a thorough clean followed by a Raptor coating that's left it durable and easy to maintain. Very happy, and I'll be back.",
      author: "Nico Van Der Merwe — Local Guide, Google Review",
    },
    {
      quote:
        "I've had two cars repaired here, both completed with excellent workmanship. Sam ensures the job is done right and to a high standard, and the turnaround time was impressive.",
      author: "Aaron Pipkorn — Google Review",
    },
    {
      quote:
        "Sam went above and beyond to fix my car — exceptional service, expert knowledge, attention to detail, and a friendly attitude that made the whole experience stress-free.",
      author: "Precious Okoye — Google Review",
    },
    {
      quote:
        "Great craftsmanship! Gave me the shortest time frame to repair my car and did a perfect job. An expert in his field.",
      author: "Patrick Ekpemilo — Google Review",
    },
    {
      quote: "Sam did an amazing job — my old Land Cruiser looks brand new.",
      author: "Mitchell Blewitt — Google Review",
    },
    {
      quote:
        "So helpful, with a speedy turnaround after my accident. Thank you, Sam!",
      author: "Chelsea Love — Google Review",
    },
    {
      quote:
        "Great workmanship, good communication, prompt and professional. Highly recommend.",
      author: "Jill Greenway — Google Review",
    },
  ],
  contact: {
    title: "Get in touch",
    description:
      "Have a question or need a quote? Reach out to our team — we are happy to help.",
  },
  quote: {
    title: "Request a free quote",
    description:
      "Tell us about your vehicle and the work required. We will review the details and contact you about the next step.",
  },
} as const;
