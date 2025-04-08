import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./utils/database.connector";
import { urlController } from "./controllers";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.APP_PORT || 8080;
const app = express();

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
