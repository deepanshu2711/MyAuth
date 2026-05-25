import { EXCHANGES, QUEUES, ROUTING_KEYS } from "./constants.js";
import { rabbitmq } from "./rabbitmq.js";

export async function setupRabbitMQ() {
  const channel = rabbitmq.getChannel();

  await channel.assertExchange(EXCHANGES.AUTH_EVENT, "topic", {
    durable: true,
  });

  await channel.assertQueue(QUEUES.WEBHOOK_EVENTS, { durable: true });

  const routingKeys = Object.values(ROUTING_KEYS);
  for (const key of routingKeys) {
    await channel.bindQueue(QUEUES.WEBHOOK_EVENTS, EXCHANGES.AUTH_EVENT, key);
  }
}
