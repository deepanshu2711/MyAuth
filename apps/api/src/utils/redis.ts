import { createClient } from "redis";

export const redis = createClient({
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: process.env.REDIS_URL!,
    port: Number(process.env.REDIS_PORT),
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();

await redis.set("foo", "bar");
const result = await redis.get("foo");
console.log(result);

// import { createClient } from "redis";
//
// export const redis = createClient({
//   socket: {
//     host: "localhost",
//     port: 6379,
//   },
// });
//
// redis.on("error", (err) => {
//   console.error("Redis Client Error", err);
// });
//
// await redis.connect();
//
// // test
// await redis.set("foo", "bar");
// const result = await redis.get("foo");
// console.log(result); // bar
