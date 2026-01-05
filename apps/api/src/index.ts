import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db.js";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Backend running on ${process.env.PORT} port`);
  connectDB();
});

//NOTE:
//1. A application should hit its own /me route not MyAuth /me route
//2. Add GlobalUserId in Cookie so that i can be used in /me route
//3. Logout from auth
//4. In Dashboard Frontend get all apps created by user
//5. View active sessions of users for a particular app
//6. Force Logout user for a specific app
//7. App specific rate-limit
//8. Integrate Google Auth
//7. Integrate Github Auth
