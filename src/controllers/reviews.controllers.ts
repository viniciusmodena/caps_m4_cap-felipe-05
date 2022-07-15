import { Request, Response } from "express";
import { IReview } from "../interfaces/review";
import createReviewService from "../services/reviews/createReview.service";
import deleteReviewService from "../services/reviews/deleteReview.service";
import listMovieReviewsService from "../services/reviews/listMovieReviews.service";
import listUserReviewsService from "../services/reviews/listUserReviews.service";

export const createReviewController = async (req: Request, res: Response) => {
  const { title, description, rating, user_id } = req.body;
  const movie_id = req.params.movie_id;

  // const user_id = req.userData.id;

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
  const id = req.params.movie_id;
  const reviews = await listMovieReviewsService(id);

  return res.status(200).json(reviews);
};

export const listUserReviewsController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.user_id;

  const reviews = await listUserReviewsService(id);
  return res.status(200).json(reviews);
};

export const deleteReviewController = async (req: Request, res: Response) => {
  const id = req.params.id;

  await deleteReviewService(id);

  return res.status(200).json({ message: "User deleted" });
};
