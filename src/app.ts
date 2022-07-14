import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import reviewsRouter from "./routers/reviews.routes";
import userRouter from './routers/user.routes'
import sessionRouter from './routers/session.routes'

const app = express()

app.use(express.json())

app.use("/reviews", reviewsRouter);
app.use('/users', userRouter)
app.use('/sessions', sessionRouter)

app.use(handleAppErrorMiddleware)

export default app
