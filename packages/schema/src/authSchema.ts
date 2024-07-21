import { z } from 'zod';

export const SignInInputSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type SignInInput = z.infer<typeof SignInInputSchema>;
