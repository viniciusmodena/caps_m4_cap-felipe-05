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
      relations: ["user"],
    });

    if (review?.user.id === userIdLogin) {
      next();
    } else {
      throw new AppError("Unauthorized", 401);
    }
  }

  if (req.params.id) {
    if (userIdLogin === req.params.id) {
      next();
    } else {
      throw new AppError("Unauthorized", 401);
    }
  }
};

export default isOwnership;
