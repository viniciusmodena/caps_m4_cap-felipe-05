import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { IPagination } from "../../interfaces/pagination";

const searchMoviesService = async (
  title: string,
  { page, limit }: IPagination
): Promise<Movie[]> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movies = await movieRepository
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movies.genres", "genres")
    .where("LOWER(movie.title) like :title", {
      title: `%${title.toLowerCase()}%`,
    })
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();

  console.log(movies);

  return movies;
};

export default searchMoviesService;
