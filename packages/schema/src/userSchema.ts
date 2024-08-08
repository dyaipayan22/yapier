import { z } from "zod";

export const createUserInputSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const sanitizedUserSchema = z.object({
  id: z.string(),
  name: z.string().min(5),
  email: z.string().email(),
});

export type SanitizedUser = z.infer<typeof sanitizedUserSchema>;
