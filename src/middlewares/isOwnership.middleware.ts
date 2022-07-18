import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Review } from "../entities/review.entity";
import { AppError } from "../errors/appError";

const isOwnership = async (req: Request, res: Response, next: NextFunction) => {
  const userIdLogin = req.userData.user_id;

  if (req.params.review_id) {
    const reviewRepository = AppDataSource.getRepository(Review);
    const review = await reviewRepository.findOne({
      where: { id: req.params.review_id },
    });

    if (review.user_id == userIdLogin) {
      next();
    }

    throw new AppError("Unauthorized", 401);
  }
};

export default isOwnership;
