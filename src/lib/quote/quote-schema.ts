import { z } from "zod";

const phonePattern = /^[+()\-\s\d]{8,24}$/;

export const serviceValues = [
  "collision-repairs",
  "paint-refinishing",
  "dent-removal",
  "performance-upgrades",
  "routine-maintenance",
  "complex-repairs",
  "car-ac-regas",
  "not-sure",
] as const;

export const quoteRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name is too long."),

  email: z.string().trim().email("Enter a valid email address.").max(160),

  phone: z.string().trim().regex(phonePattern, "Enter a valid phone number."),

  preferredContact: z.enum(["phone", "email"]),

  vehicleMake: z.string().trim().min(1, "Enter the vehicle make.").max(80),

  vehicleModel: z.string().trim().min(1, "Enter the vehicle model.").max(80),

  vehicleYear: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/, "Enter a valid four-digit year."),

  registration: z.string().trim().max(20).optional().default(""),

  service: z.enum(serviceValues),

  description: z
    .string()
    .trim()
    .min(20, "Provide more information about the damage or work required.")
    .max(3000, "The description is too long."),

  consent: z.literal("on", {
    message: "You must agree to be contacted about this request.",
  }),

  website: z.string().max(0).optional().default(""),

  startedAt: z.coerce.number().int().positive(),

  turnstileToken: z.string().optional().default(""),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
