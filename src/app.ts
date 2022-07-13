import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import routes from "./routers/routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use(handleAppErrorMiddleware);

export default app;
