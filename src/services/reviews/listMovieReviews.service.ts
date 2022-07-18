import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { AppError } from "../../errors/appError";

const listMovieReviewsService = async (movie_id: string) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movie = movieRepository.findOne({ where: { id: movie_id } });

  if (!movie) {
    throw new AppError("Movie not found!", 404);
  }

  const movieReviews = await movieRepository.findOne({
    relations: {
      reviews: true,
    },
    where: { id: movie_id },
  });

  return movieReviews;
};

export default listMovieReviewsService;
