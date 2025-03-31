import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(3, "Too short"),
  website: z.string().optional(),
});

export type OnboardingFormSchema = z.infer<typeof onboardingSchema>;
