import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  listMovieReviewsController,
  listUserReviewsController,
} from "../controllers/reviews.controllers";
import tokenValidation from "../middlewares/tokenValidation.middleware";

const reviewsRouter = Router();

reviewsRouter.post("/:movie_id", tokenValidation, createReviewController);
reviewsRouter.get("/users/:user_id", listUserReviewsController);
reviewsRouter.get("/movies/:movie_id", listMovieReviewsController);
reviewsRouter.delete("/:id", tokenValidation, deleteReviewController);

export default reviewsRouter;
