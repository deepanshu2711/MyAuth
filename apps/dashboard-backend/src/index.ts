import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

app.listen(5006, () => {
  console.log("Backend running on 5006 port");
});
