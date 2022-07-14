import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import reviewsRouter from "./routers/reviews.routes";

const app = express();

app.use(express.json());

app.use("/reviews", reviewsRouter);

app.use(handleAppErrorMiddleware);

export default app;
