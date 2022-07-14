import { AppDataSource } from "../../data-source";
import { Review } from "../../entities/review.entity";

const deleteReviewService = async (id: string): Promise<void> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const reviews = await reviewRepository.find();

  const review = reviews.find((review) => review.id === id);

  await reviewRepository.delete(review!.id);
};

export default deleteReviewService;
