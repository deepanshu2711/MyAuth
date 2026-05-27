import dotenv from "dotenv";
dotenv.config();

import type { Channel, connect } from "amqplib";
import amqp from "amqplib";

type RabbitConnection = Awaited<ReturnType<typeof connect>>;

class RabbitMQ {
  private connection: RabbitConnection | null = null;
  private channel: Channel | null = null;
  private url: string =
    process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672";

  async connect() {
    if (this.connection && this.channel) {
      return this.channel;
    }

    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();

    return this.channel;
  }

  getChannel() {
    if (!this.channel) {
      throw new Error("RabbitMQ not connected");
    }

    return this.channel;
  }
}

export const rabbitmq = new RabbitMQ();
