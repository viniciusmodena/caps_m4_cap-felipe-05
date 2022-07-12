import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";

const app = express();

app.use(express.json());

app.use(handleAppErrorMiddleware);

export default app;
