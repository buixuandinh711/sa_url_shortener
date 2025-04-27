import dotenv from "dotenv";

dotenv.config();
const config = {
  host: process.env.REDIS_HOST || "",
  port: Number(process.env.REDIS_PORT) || 0,
  password: process.env.REDIS_PASSWORD || "",
};
export default config;
