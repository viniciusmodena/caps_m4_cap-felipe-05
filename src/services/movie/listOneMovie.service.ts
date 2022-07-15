import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { AppError } from "../../errors/appError";

const listOneMovieService = async (id: string) => {
  const movieOneRepository = AppDataSource.getRepository(Movie);

  const movie = await movieOneRepository.findOneBy({ id });

  const movieOne = await movieOneRepository.findOneBy({ id: id });
  if (!movieOne) {
    throw new AppError("Movie not found");
  }

  return movie;
};
export default listOneMovieService;
