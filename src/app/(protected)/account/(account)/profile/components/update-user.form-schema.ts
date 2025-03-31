import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string(),
  name: z
    .string({ message: "The user name is required" })
    .min(3, "The user name must be at least 3 characters long")
    .regex(/^[\s\w\u00C0-\u017F]+$/i, "Please use only letters and numbers"),
  companyName: z
    .string()
    .min(3, "The company name must be at least 3 characters long")
    .optional(),
  companyWebsite: z.string().url().or(z.literal("")),
});

export type UpdateUserFormSchema = z.infer<typeof updateUserSchema>;
