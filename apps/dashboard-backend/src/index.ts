import { app } from "./app.js";
import { connectDB } from "./db.js";

app.listen(5005, () => {
  console.log("Backend running on 5005 port");
  connectDB();
});
