import { Review } from "../../entities/review.entity";
import { AppDataSource } from "../../data-source";

const listMovieReviewsService = async (movie_id: string): Promise<Review[]> => {
  const reviewRepository = AppDataSource.getRepository(Review);

  const reviews = await reviewRepository.find({
    where: { movie: { id: movie_id } },
    relations: ["movie"],
  });

  return reviews;
};

export default listMovieReviewsService;
