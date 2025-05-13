import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(3, "Too short"),
  website: z.union([z.string().url(), z.literal("")]),
});

export type OnboardingFormSchema = z.infer<typeof onboardingSchema>;
