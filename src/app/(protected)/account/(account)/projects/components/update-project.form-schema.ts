import { z } from "zod";

export const updateProjectSchema = z.object({
  id: z.string(),
  name: z
    .string({ message: "The project name is required" })
    .min(3, "The project name must be at least 3 characters long")
    .regex(/^[\s\w\u00C0-\u017F]+$/i, "Please use only letters and numbers"),
  description: z.string().optional(),
});

export type UpdateProjectFormSchema = z.infer<typeof updateProjectSchema>;
