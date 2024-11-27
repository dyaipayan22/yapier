import prisma from "@repo/database";
import { kafka } from "@repo/kafka";

const TOPIC_NAME = process.env.KAFKA_TOPIC_NAME as string;

export async function queuePendingTasks() {
  const producer = kafka.producer();
  await producer.connect();
  console.log("Producer connected");
  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      take: 10,
    });
    console.log(pendingRows);

    producer.send({
      topic: TOPIC_NAME,
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
    await new Promise((r) => setTimeout(r, 3000));
  }
}
