import { IMovie } from "../../interfaces/movie";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const createMovieService = async ({
  title,
  release_year,
  synopse,
  image_url,
}: IMovie) => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const newMovie = movieRepository.create({
    title,
    release_year,
    synopse,
    image_url,
  });

  await movieRepository.save(newMovie);

  return newMovie;
};

export default createMovieService;
