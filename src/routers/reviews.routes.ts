import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  listMovieReviewsController,
  listUserReviewsController,
} from "../controllers/reviews.controllers";

const reviewsRouter = Router();

reviewsRouter.post("/:movie_id", createReviewController);
reviewsRouter.get("/users/:user_id", listUserReviewsController);
reviewsRouter.get("/movies/:movie_id", listMovieReviewsController);
reviewsRouter.delete("/:review_id", deleteReviewController);

export default reviewsRouter;
