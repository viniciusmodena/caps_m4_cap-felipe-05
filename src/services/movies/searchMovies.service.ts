import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const searchMoviesService = async (title: string): Promise<Movie[]> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const movies = await movieRepository
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movies.genres", "genres")
    .where("LOWER(movie.title) like :title", {
      title: `%${title.toLowerCase()}%`,
    })
    .getMany();

  console.log(movies);

  return movies;
};

export default searchMoviesService;
