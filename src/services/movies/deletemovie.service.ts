import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const deleteMovieService = async (id: string) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOneBy({ id: id });

  if (!movie) {
    throw new Error("movie not found");
  }
  const deleteMovie = await movieRepository.delete(movie.id);
  return deleteMovie;
};

export default deleteMovieService;
