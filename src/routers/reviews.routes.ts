import { Router } from "express";
import {
  createReviewController,
  deleteReviewController,
  listMovieReviewsController,
  listUserReviewsController,
} from "../controllers/reviews.controllers";
import { validate } from "../middlewares/validate.middleware";
import reviewCreateSchema from "../schemas/review.schema";
import tokenValidation from "../middlewares/tokenValidation.middleware";

const reviewsRouter = Router();

reviewsRouter.post(
  "/movies/:movie_id",
  tokenValidation,
  validate(reviewCreateSchema),
  createReviewController
);

reviewsRouter.get("/users/:user_id", listUserReviewsController);
reviewsRouter.get("/movies/:movie_id", listMovieReviewsController);
reviewsRouter.delete("/:review_id", tokenValidation, deleteReviewController);

export default reviewsRouter;
