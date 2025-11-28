import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db.js";
import { userConsumer } from "./modules/auth/user.consumer.js";

dotenv.config();

userConsumer().catch(console.error);

app.listen(5006, () => {
  console.log("Backend running on 5006 port");
  connectDB();
});
