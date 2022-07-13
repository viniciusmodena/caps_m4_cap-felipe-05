import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const listOneMovieService = async (id: string) => {
  const movieOneRepository = AppDataSource.getRepository(Movie);

  const movie = await movieOneRepository.findOneBy({ id });

  return movie;
};

export default listOneMovieService;
