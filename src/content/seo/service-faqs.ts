import { contactConfig } from "@/config/contact";

export const serviceFaqs = [
  {
    question: "What automotive services does JS Auto Body Repairs provide?",
    answer:
      "JS Auto Body Repairs provides collision repairs, paint refinishing, dent removal, performance upgrades, routine maintenance, complex repairs and car air-conditioning regas services.",
  },
  {
    question: "Where is JS Auto Body Repairs located?",
    answer: `The workshop is located at ${contactConfig.address.formatted}.`,
  },
  {
    question: "What are the workshop opening hours?",
    answer:
      "The workshop is open Monday to Friday from 8:30 AM to 4:30 PM and is closed on Saturday and Sunday.",
  },
  {
    question: "How can I request a repair quote?",
    answer: `You can submit the online quote request form with your vehicle details and photos, or call ${contactConfig.phone.display}.`,
  },
] as const;
