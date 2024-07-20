import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type SignUp = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type SignIn = z.infer<typeof SignInSchema>;
