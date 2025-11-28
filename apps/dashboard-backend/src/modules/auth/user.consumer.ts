import type { ConsumeMessage } from "amqplib";
import { RabbitMQConnection } from "../../utils/rabbitmq/connection.js";
import { User } from "../../models/user.model.js";

const connection = RabbitMQConnection.getInstance();

export const userConsumer = async () => {
  const channel = await connection.connect();
  const exchange = "user_exchange";

  await channel.assertExchange(exchange, "topic", { durable: true });

  const createQueue = "create_user_q";
  await channel.assertQueue(createQueue, { durable: true });
  await channel.bindQueue(createQueue, exchange, "user.create");

  const updateQueue = "update_user_q";
  await channel.assertQueue(updateQueue, { durable: true });
  await channel.bindQueue(updateQueue, exchange, "user.update");

  channel.consume(createQueue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString());
      await User.findOneAndUpdate(
        { email: data.data.email },
        { $setOnInsert: { globalUserId: data.data.globalUserId } },
        { upsert: true, new: true },
      );
      channel.ack(msg);
    } catch (error) {
      console.error("Failed to process create user message:", error);
      channel.nack(msg, false, true);
    }
  });

  channel.consume(updateQueue, (msg: ConsumeMessage | null) => {
    if (!msg) return;
    console.log("Update User:", msg.content.toString());
    channel.ack(msg);
  });

  console.log("User consumers started...");
};
