import config from "../configs/redis.config";
import { createClient } from 'redis';

export const redis = createClient({
  url: `redis://${config.host}:${config.port}`,
  password: config.password,
  // socket: {
  //   host: config.host,
  //   port: config.port,
  // },
});
