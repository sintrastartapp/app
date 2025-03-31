import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string({ message: "The project name is required" })
    .min(3, "The project name must be at least 3 characters long")
    .regex(
      /^[\.\-\s\w\u00C0-\u017F]+$/i,
      `The only special characters allowed are ".", "_" and "-"`
    ),
  description: z.string().optional(),
});

export type CreateProjectFormSchema = z.infer<typeof createProjectSchema>;
