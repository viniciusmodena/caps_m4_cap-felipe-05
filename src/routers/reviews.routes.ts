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
import isOwnership from "../middlewares/isOwnership.middleware";
import isUuidMiddleware from "../middlewares/isUUID.middleware";

const reviewsRouter = Router();

reviewsRouter.post(
  "/movies/:movie_id",
  tokenValidation,
  validate(reviewCreateSchema),
  createReviewController
);

reviewsRouter.get(
  "/users/:user_id",
  isUuidMiddleware,
  listUserReviewsController
);
reviewsRouter.get(
  "/movies/:movie_id",
  isUuidMiddleware,
  listMovieReviewsController
);
reviewsRouter.delete(
  "/:review_id",
  isUuidMiddleware,
  tokenValidation,
  isOwnership,
  deleteReviewController
);

export default reviewsRouter;
