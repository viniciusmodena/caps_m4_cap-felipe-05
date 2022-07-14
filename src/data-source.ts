import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

const host = process.env.IS_COMPOSE ? "db" : "localhost";

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["./src/entities/*.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host,
        port: 5432,
        username: "suell",
        password: "1234",
        database: "capstone_m4",
        synchronize: false,
        logging: false,
        entities: ["./src/entities/*.ts"],
        migrations: ["./src/migrations/*.ts"],
      });
