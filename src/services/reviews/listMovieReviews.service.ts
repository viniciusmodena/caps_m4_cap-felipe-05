import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const listMovieReviewsService = async (movie_id: string) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  console.log(movie_id);
  const reviews = await movieRepository.findOne({
    relations: {
      reviews: true,
    },
    where: { id: movie_id },
  });

  return reviews;
};

export default listMovieReviewsService;
