import { z } from "zod";

export const createZapSchema = z.object({
  triggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      actionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});

export type CreateZap = z.infer<typeof createZapSchema>;

export const zapSchema = z.object({
  id: z.string(),
  triggerId: z.string(),
  userId: z.string(),
  actions: z.array(
    z.object({
      id: z.string(),
      zapId: z.string(),
      actionId: z.string(),
      sortingOrder: z.number(),
      type: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
      }),
    })
  ),
  trigger: z.object({
    id: z.string(),
    zapId: z.string(),
    triggerId: z.string(),
    type: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
    }),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Zap = z.infer<typeof zapSchema>;

export const triggerSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type AvailableTrigger = z.infer<typeof triggerSchema>;

export const actionSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type AvailableAction = z.infer<typeof actionSchema>;
