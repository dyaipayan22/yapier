import { PrismaClient } from '@repo/database/client';
import { kafka } from './config/kafka';

const prisma = new PrismaClient();

export async function queuePendingTasks() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      take: 10,
    });

    producer.send({
      topic: process.env.TOPIC_NAME as string,
      messages: pendingRows.map((row) => {
        return {
          value: JSON.stringify({ zapRunId: row.zapRunId, stage: 0 }),
        };
      }),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((row) => row.id),
        },
      },
    });
  }
}
