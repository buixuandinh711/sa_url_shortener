import { DataSource } from "typeorm";
import config from "../configs/database.config";

export const AppDataSource = new DataSource({
  ...config,
  type: "postgres",
  synchronize: true,
  logging: ["error", "warn"],
  subscribers: [],
  migrations: [],
  entities: ["src/models/*.ts"],
});
