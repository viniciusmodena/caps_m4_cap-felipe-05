import { AppDataSource } from "../../data-source";
import { Review } from "../../entities/review.entity";
import { AppError } from "../../errors/appError";

const deleteReviewService = async (review_id: string): Promise<void> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const review = await reviewRepository.findOne({ where: { id: review_id } });

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  await reviewRepository.delete(review!.id);
};

export default deleteReviewService;
