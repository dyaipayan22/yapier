import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID as string,
  brokers: [process.env.KAFKA_HOST as string],
});
