import { PrismaClient } from '@repo/database/client';
import { type CreateZap } from '@repo/schema';

const prisma = new PrismaClient();

export async function createZap(input: CreateZap) {
  await prisma.$transaction(async (tx) => {
    const zap = await tx.zap.create({
      data: {
        triggerId: '',
        actions: {
          create: {},
        },
      },
    });

    const trigger = await tx.trigger.create({});

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
  });
}
