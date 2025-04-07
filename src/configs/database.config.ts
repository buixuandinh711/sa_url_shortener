import dotenv from "dotenv";

dotenv.config();
const config = {
  host: process.env.PG_HOST || "",
  port: Number(process.env.PG_PORT) || 0,
  username: process.env.PG_USER || "",
  password: process.env.PG_PASSWORD || "",
  database: process.env.PG_DATABASE || "",
};

export default config;
