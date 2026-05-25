import { rabbitmq } from "./rabbitmq.js";

export const publish = async ({
  exchange,
  routingKey,
  payload,
}: {
  exchange: string;
  routingKey: string;
  payload: unknown;
}) => {
  const channel = rabbitmq.getChannel();
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });
};
