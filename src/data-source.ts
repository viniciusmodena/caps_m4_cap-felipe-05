import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

const host = process.env.IS_COMPOSE ? "db" : "localhost";
const synchronize = process.env.NODE_ENV === "teste" ? true : false;
export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port: 5432,
  username: "suell",
  password: "1234",
  database: "capstone_m4",
  synchronize,
  logging: false,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});
