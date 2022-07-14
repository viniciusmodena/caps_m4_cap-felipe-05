import { AppDataSource } from "../../data-source";
import { Review } from "../../entities/review.entity";
import { User } from "../../entities/user.entity";
import { Movie } from "../../entities/movie.entity";
import { AppError } from "../../errors/appError";
import { IReview } from "../../interfaces/review";

const createReviewService = async ({
  title,
  description,
  rating,
  movie_id,
  user_id,
}: IReview): Promise<Review> => {
  const reviewRepository = AppDataSource.getRepository(Review);
  const userRepository = AppDataSource.getRepository(User);
  const movieRepository = AppDataSource.getRepository(Movie);

  const user = await userRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw new AppError("User not found");
  }

  const movie = await movieRepository.findOne({ where: { id: movie_id } });

  if (!movie) {
    throw new AppError("Movie not found");
  }

  const newReview = reviewRepository.create({
    title,
    description,
    rating,
    user,
    movie,
  });

  await reviewRepository.save(newReview);

  return newReview;
};

export default createReviewService;
