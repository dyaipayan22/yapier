import { z } from "zod";

export const emailSelectorSchema = z.object({
  to: z.string().min(1).email(),
  body: z.string().min(1),
});

export type EmailSelector = z.infer<typeof emailSelectorSchema>;

export const solanaSelectorSchema = z.object({
  to: z.string().min(1),
  from: z.string().min(1),
});

export type SolanaSelector = z.infer<typeof solanaSelectorSchema>;
