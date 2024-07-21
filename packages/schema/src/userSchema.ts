import { z } from 'zod';

export const CreateUserInputSchema = z.object({
  name: z.string().min(5),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
