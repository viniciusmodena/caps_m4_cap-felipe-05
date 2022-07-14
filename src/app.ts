import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import handleAppErrorMiddleware from './middlewares/handleAppError.middleware'
import reviewsRouter from './routers/reviews.routes'
import userRouter from './routers/user.routes'
import sessionRouter from './routers/session.routes'
import genreRouter from './routers/genres.routes'


const app = express()

app.use(express.json())

app.use('/reviews', reviewsRouter)
app.use('/users', userRouter)
app.use('/sessions', sessionRouter)
app.use('/genres', genreRouter)

app.use(handleAppErrorMiddleware)

export default app
