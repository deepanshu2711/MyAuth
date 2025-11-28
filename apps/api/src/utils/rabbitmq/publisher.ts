import { RabbitMQConnection } from "./connection.js";
import type { Channel } from "amqplib";

export class RabbitMQPublisher {
  private connection = RabbitMQConnection.getInstance();
  private exchangeName = "user_exchange";

  private async setUpExchange(channel: Channel) {
    await channel.assertExchange(this.exchangeName, "topic", {
      durable: true,
    });
  }

  public async publishCreateUser(userData: any) {
    const channel = await this.connection.connect();
    await this.setUpExchange(channel);

    const routingKey = "user.create";
    const message = Buffer.from(JSON.stringify(userData));

    channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
    });
    console.log(`Published create user message to ${routingKey}`);
  }

  public async publishUpdateUser(userData: any) {
    const channel = await this.connection.connect();
    await this.setUpExchange(channel);

    const routingKey = "user.update";
    const message = Buffer.from(JSON.stringify(userData));

    channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
    });
    console.log(`Published update user message to ${routingKey}`);
  }
}
