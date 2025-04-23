import config from "../configs/redis.config";
import { Redis } from "ioredis";

export const redis = new Redis(config.port, config.host, {
  password: config.password,
});
