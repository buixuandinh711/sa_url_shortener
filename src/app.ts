import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./utils/database.connector";
// import { redis } from "./utils/redis.connector";
import { urlController } from "./controllers";
import path from "path";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log(err);
  });

// redis.on("connect", () => {
//   console.log("Redis client connected");
// });
// redis.on("error", (err: Error) => {
//   console.log("Redis error: ", err);
// });
// redis.on("ready", () => {
//   console.log("Redis client is ready to use");
// });
const PORT = process.env.APP_PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const frontendPath = path.resolve(__dirname, "../fe/dist");
app.use(express.static(frontendPath));

// ROUTES
app.use("/", urlController);
app.get("/api/v1/health", async (_, res) => {
  res.json({
    status: "success",
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("List route " + app._router);
    console.log("App is listening on port " + PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
