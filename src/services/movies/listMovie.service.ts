import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const listMovieService = async () => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movies = await movieRepository
    .createQueryBuilder("movies")
    .leftJoinAndSelect("movies.genres", "genres")
    .getMany();

  return movies;
};

export default listMovieService;
