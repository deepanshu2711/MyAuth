import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db.js";
import { userConsumer } from "./modules/auth/user.consumer.js";

dotenv.config();

userConsumer().catch(console.error);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT} port`);
  connectDB();
});
