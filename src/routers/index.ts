import { Express } from "express";
import genreRouter from "./genres.routes";
import moviesRouter from "./movies.routes";
import reviewsRouter from "./reviews.routes";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRouter);
  app.use("/genres", genreRouter);
  app.use("/login", sessionRouter);
  app.use("/movies", moviesRouter);
  app.use("/reviews", reviewsRouter);
};

export default appRoutes;
