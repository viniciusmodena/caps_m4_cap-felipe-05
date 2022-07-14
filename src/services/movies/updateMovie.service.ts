import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";

const updateMovieService = async (
  id: string,
  title: string,
  release_year: number,
  synopse: string,
  image_url: string
) => {
  const movieUpdateRepository = AppDataSource.getRepository(Movie);

  const movie = await movieUpdateRepository.findOneBy({ id: id });
  if (!movie) {
    throw new Error("User not found");
  }
  await movieUpdateRepository.update(movie!.id, {
    title: title,
    release_year: release_year,
    synopse: synopse,
    image_url: image_url,
  });

  return true;
};

export default updateMovieService;