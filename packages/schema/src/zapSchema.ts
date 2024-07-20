import { z } from 'zod';

export const CreateZapSchema = z.object({
  triggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      actionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});

export type CreateZap = z.infer<typeof CreateZapSchema>;
