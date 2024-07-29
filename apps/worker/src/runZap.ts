import { kafka } from './config/kafka';
import { PrismaClient } from '@repo/database/client';

const prisma = new PrismaClient();

export async function executeZap() {
  const consumer = kafka.consumer({ groupId: '' });
  await consumer.connect();

  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({ topic: '', fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ partition, offset: message.offset, value: message.value });

      if (!message.value?.toString()) return;

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prisma.zapRun.findFirst({
        where: { id: zapRunId },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.log('Current action not found');
        return;
      }

      const zapRunMetadata = zapRunDetails?.metadata;

      const lastStage = (zapRunDetails?.zap?.actions?.length || 1) - 1;
      if (lastStage !== stage) {
        console.log('Pushing back to queue');
        await producer.send({
          topic: '',
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }

      console.log('Processing done');

      await consumer.commitOffsets([
        {
          topic: '',
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}
