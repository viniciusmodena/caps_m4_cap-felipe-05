import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { AppError } from "../../errors/appError";

const listOneMovieService = async (id: string) => {
  const movieOneRepository = AppDataSource.getRepository(Movie);

  // const movie = await movieOneRepository.findOneBy({ id });

  const movie = await movieOneRepository
    .createQueryBuilder("movies")
    .leftJoinAndSelect("movies.genres", "genres")
    .where("movies.id = :movieId", { movieId: id })
    .getOne();

  if (!movie) {
    throw new AppError("Genre not found", 404);
  }

  return movie;
};

export default listOneMovieService;
