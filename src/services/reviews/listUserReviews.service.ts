import { Review } from "../../entities/review.entity";
import { AppDataSource } from "../../data-source";

const listUserReviewsService = async (user_id: string): Promise<Review[]> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const reviews = await reviewRepository.find({ where: { id: user_id } });

  return reviews;
};

export default listUserReviewsService;
