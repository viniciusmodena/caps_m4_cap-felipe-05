import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'

const host = process.env.IS_COMPOSE ? "db" : "localhost";

const synchronize = process.env.NODE_ENV === "test" ? true : false;

export const AppDataSource = new DataSource({
        type: "postgres",
        // host,
        // port: 5432,
        // username: process.env.POSTGRES_USER,
        // password: process.env.POSTGRES_PASSWORD,
        // database: process.env.POSTGRES_DB,
        // synchronize: false,
        // logging: false,
        // entities: ["./src/entities/*.ts"],
        // migrations: ["./src/migrations/*.ts"],
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        synchronize,
        logging: false,
        entities:
          process.env.NODE_ENV === "production"
            ? ["./dist/src/entities/*.js"]
            : ["./src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["./dist/src/migrations/*.js"]
            : ["./src/migrations/*.ts"],
      });
