import crypto from "crypto";
import axios from "axios";

import { WebHook } from "../models/webhook.model.js";
import { QUEUES } from "../utils/rabbitmq/constants.js";
import { consume } from "../utils/rabbitmq/consumer.js";

export async function startWebhookWorker() {
  await consume(QUEUES.WEBHOOK_EVENTS, async (event, routingKey) => {
    console.log(event);

    const webhooks = await WebHook.find({
      appId: event.appId,
      isActive: true,
      events: { $in: [routingKey] },
    });

    const payload = {
      event: routingKey,
      data: event,
      timestamp: Date.now(),
    };

    const results = await Promise.allSettled(
      webhooks.map(async (webhook) => {
        const body = JSON.stringify(payload);

        const signature = crypto
          .createHmac("sha256", webhook.secret)
          .update(body)
          .digest("hex");

        return axios.post(webhook.url, payload, {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Signature": signature,
            "X-Webhook-Event": routingKey,
          },
        });
      }),
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Webhook ${webhooks[index]?._id} delivered successfully`);
      } else {
        console.error(`Webhook ${webhooks[index]?._id} failed`, result.reason);
      }
    });
  });
}
