import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});
