import { Kafka } from "kafkajs";

const CLIENT_ID = process.env.KAFKA_CLIENT_ID as string;
const HOST = process.env.KAFKA_HOST as string;

export const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: [HOST],
});
