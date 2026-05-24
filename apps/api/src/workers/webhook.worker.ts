import { QUEUES } from "../utils/rabbitmq/constants.js";
import { consume } from "../utils/rabbitmq/consumer.js";

export async function startWebhookWorker() {
  await consume(QUEUES.WEBHOOK_EVENTS, async (event) => {
    console.log(event);

    // find webhooks
    // sign payload
    // send webhook
  });
}
