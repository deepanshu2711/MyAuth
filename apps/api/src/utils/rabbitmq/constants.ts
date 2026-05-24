export const EXCHANGES = {
  AUTH_EVENT: "auth.event",
};

export const ROUTING_KEYS = {
  USER_CREATED: "user.created",
  USER_UPDATED: "user.updated",
  USER_DELETED: "user.deleted",
} as const;

export const QUEUES = {
  WEBHOOK_EVENTS: "webhook-events",
} as const;
