import { kafka } from "./config/kafka";
import prisma, { JsonObject } from "@repo/database";
import { parse } from "./parser";
import { sendEmail } from "@repo/mailer";
export async function executeZap() {
  const consumer = kafka.consumer({ groupId: `${process.env.KAFKA_GROUP_ID}` });
  await consumer.connect();
  console.log("Consumer connected");

  const producer = kafka.producer();
  await producer.connect();
  console.log("Producer connected");

  await consumer.subscribe({
    topic: `${process.env.KAFKA_TOPIC_NAME}`,
    fromBeginning: true,
  });
  console.log("Kafka subscribed");

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

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
      console.log("Zap Run Details");

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.log("Current action not found");
        return;
      }

      const zapRunMetadata = zapRunDetails?.metadata;

      if (currentAction.type.id === "email") {
        const body = parse(
          (currentAction.metadata as JsonObject)?.body as string,
          zapRunMetadata
        );
        const to = parse(
          (currentAction.metadata as JsonObject)?.email as string,
          zapRunMetadata
        );
        console.log(`Sending out email to ${to} body is ${body}`);
        await sendEmail(to, body);
      }

      await new Promise((r) => setTimeout(r, 500));

      const lastStage = (zapRunDetails?.zap?.actions?.length || 1) - 1;
      if (lastStage !== stage) {
        console.log("Pushing back to queue");
        await producer.send({
          topic: "zap-events",
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

      console.log("Processing done");

      await consumer.commitOffsets([
        {
          topic: "zap-events",
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}
