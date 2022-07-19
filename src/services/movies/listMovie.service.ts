import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { IPagination } from "../../interfaces/pagination";

const listMovieService = async ({ page, limit }: IPagination) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movies = await movieRepository
    .createQueryBuilder("movies")
    .leftJoinAndSelect("movies.genres", "genres")
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();

  return movies;
};

export default listMovieService;
