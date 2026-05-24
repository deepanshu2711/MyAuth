import { rabbitmq } from "./rabbitmq.js";

export async function consume(
  queue: string,
  handler: (data: any) => Promise<void>,
) {
  const channel = rabbitmq.getChannel();

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      await handler(data);

      channel.ack(msg);
    } catch (error) {
      console.error(error);

      channel.nack(msg, false, false);
    }
  });
}
