import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { AppError } from "../../errors/appError";

const deleteMovieService = async (id: string): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOneBy({ id: id });

  if (!movie) {
    throw new AppError("Movie not found");
  }

  await movieRepository.delete(movie!.id);
};

export default deleteMovieService;
