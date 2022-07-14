import { IMovie } from "../interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";

const createMovieService = async ({
  title,
  release_year,
  sypnose,
  image_url,
}: IMovie) => {
  const userRepository = AppDataSource.getRepository(Movie);

  const newMovie = userRepository.create({
    title,
    release_year,
    sypnose,
    image_url,
  });

  await userRepository.save(newMovie);

  return newMovie;
};

export default createMovieService;
