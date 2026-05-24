import { EXCHANGES } from "./constants.js";
import { rabbitmq } from "./rabbitmq.js";

export async function setupRabbitMQ() {
  const channel = rabbitmq.getChannel();

  await channel.assertExchange(EXCHANGES.AUTH_EVENT, "topic", {
    durable: true,
  });
}
