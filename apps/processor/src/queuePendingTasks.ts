import prisma from '@repo/database';
import { kafka } from './config/kafka';

export async function queuePendingTasks() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      take: 10,
    });

    producer.send({
      topic: `${process.env.KAFKA_TOPIC_NAME}`,
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
