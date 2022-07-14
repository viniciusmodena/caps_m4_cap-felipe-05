import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import moviesRouter from "./routers/movies.routes";
import reviewsRouter from "./routers/reviews.routes";
import userRouter from './routers/user.routes'
import sessionRouter from './routers/session.routes'

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/sessions", sessionRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);


app.use(handleAppErrorMiddleware);

export default app;
