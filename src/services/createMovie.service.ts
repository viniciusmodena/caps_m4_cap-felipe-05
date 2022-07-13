import { IMovie } from "../interfaces";
import { AppDataSource } from "../data-source";
import { v4 as uuid } from "uuid";
import { Movie } from "../entities/index";

const createMovieService = async ({
  title,
  release_year,
  sypnose,
  image_url,
}: IMovie) => {
  const userRepository = AppDataSource.getRepository(Movie);

  const newMovie = userRepository.create({
    id: uuid(),
    title,
    release_year,
    sypnose,
    image_url,
  });

  await userRepository.save(newMovie);

  return newMovie;
};

export default createMovieService;
