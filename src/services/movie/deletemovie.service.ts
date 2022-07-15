import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { AppError } from "../../errors/appError";

const deleteMovieService = async (id: string) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOneBy({ id: id });

  if (!movie) {
    throw new AppError("movie not found");
  }
  const deleteMovie = await movieRepository.delete(movie.id);
  return deleteMovie;
};

export default deleteMovieService;
