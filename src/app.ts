import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import userRouter from "./routers/user.routes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use(handleAppErrorMiddleware);

export default app;
