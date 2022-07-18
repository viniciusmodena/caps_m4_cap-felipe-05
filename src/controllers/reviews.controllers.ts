import { Request, Response } from "express";
import createReviewService from "../services/reviews/createReview.service";
import deleteReviewService from "../services/reviews/deleteReview.service";
import listMovieReviewsService from "../services/reviews/listMovieReviews.service";
import listUserReviewsService from "../services/reviews/listUserReviews.service";

export const createReviewController = async (req: Request, res: Response) => {
  const { title, description, rating } = req.body;
  const { movie_id } = req.params;
  const { user_id } = req.userData;
  console.log(user_id);
  console.log("entrou");

  const newReview = await createReviewService({
    title,
    description,
    rating,
    movie_id,
    user_id,
  });

  return res.status(201).json(newReview);
};

export const listMovieReviewsController = async (
  req: Request,
  res: Response
) => {
  const { movie_id } = req.params;
  const reviews = await listMovieReviewsService(movie_id);

  return res.status(200).json(reviews);
};

export const listUserReviewsController = async (
  req: Request,
  res: Response
) => {
  const { user_id } = req.params;

  const reviews = await listUserReviewsService(user_id);
  return res.status(200).json(reviews);
};

export const deleteReviewController = async (req: Request, res: Response) => {
  const { review_id } = req.params;

  await deleteReviewService(review_id);

  return res.status(200).json({ message: "Review deleted" });
};
