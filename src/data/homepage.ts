import {
  BadgeCheck,
  CarFront,
  CircleDollarSign,
  Clock3,
  Gauge,
  Paintbrush2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export const homepageServices = [
  {
    title: "Collision repairs",
    description:
      "Structured repair planning for accident damage, panel alignment and safe road-ready restoration.",
    icon: CarFront,
  },
  {
    title: "Panel restoration",
    description:
      "Precision repair and replacement for damaged panels, dents, creases and distorted bodywork.",
    icon: Wrench,
  },
  {
    title: "Paint refinishing",
    description:
      "Colour matching, surface preparation and controlled refinishing for a consistent factory-quality appearance.",
    icon: Paintbrush2,
  },
  {
    title: "Insurance support",
    description:
      "Clear documentation, damage assessment and practical support through the repair approval process.",
    icon: ShieldCheck,
  },
] as const;

export const homepageProcess = [
  {
    step: "01",
    title: "Assess",
    description:
      "We inspect the visible and underlying damage, document the repair scope and explain what the vehicle needs.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "The repair sequence, parts, refinishing requirements and estimated timing are organised before work begins.",
  },
  {
    step: "03",
    title: "Repair",
    description:
      "Panels, structure and exterior components are restored with disciplined workmanship and quality checks.",
  },
  {
    step: "04",
    title: "Refinish",
    description:
      "Surfaces are prepared, colour-matched and finished to produce a clean, durable and consistent result.",
  },
  {
    step: "05",
    title: "Return",
    description:
      "The vehicle receives a final inspection before it is returned ready for the road.",
  },
] as const;

export const homepageBenefits = [
  {
    title: "Accurate assessment",
    description:
      "The repair begins with a clear understanding of the damage rather than assumptions.",
    icon: Gauge,
  },
  {
    title: "Quality-focused workmanship",
    description:
      "Every stage is organised around correct preparation, alignment and finish quality.",
    icon: BadgeCheck,
  },
  {
    title: "Clear communication",
    description:
      "You receive practical explanations, realistic expectations and updates that make sense.",
    icon: Clock3,
  },
  {
    title: "Value-conscious repair planning",
    description:
      "Repair decisions are made with safety, quality, timing and overall value in view.",
    icon: CircleDollarSign,
  },
] as const;

export const homepageTestimonials = [
  {
    quote:
      "The repair was explained clearly, the finish looked excellent and the whole process felt professional.",
    name: "Recent customer",
    service: "Collision repair",
  },
  {
    quote:
      "The vehicle looked properly restored rather than simply covered up. The attention to detail stood out.",
    name: "Recent customer",
    service: "Panel and paint",
  },
  {
    quote:
      "Communication was straightforward and the final result gave me confidence in the repair.",
    name: "Recent customer",
    service: "Accident damage",
  },
] as const;

export const homepageTrustItems = [
  {
    label: "Repair planning",
    icon: ShieldCheck,
  },
  {
    label: "Panel expertise",
    icon: Wrench,
  },
  {
    label: "Paint refinishing",
    icon: Sparkles,
  },
  {
    label: "Quality control",
    icon: BadgeCheck,
  },
] as const;
