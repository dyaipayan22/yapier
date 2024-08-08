import { z } from "zod";

export const signInInputSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
