import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { Genre } from "../../entities/genre.entity";
import { IGenre_Movie_Ids } from "../../interfaces/genre";
import { AppError } from "../../errors/appError";

const addGenreToMovieService = async ({
  movieId,
  genreList,
}: IGenre_Movie_Ids) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const genreRepository = AppDataSource.getRepository(Genre);

  const movie = await movieRepository
    .createQueryBuilder("movies")
    .leftJoinAndSelect("movies.genres", "genres")
    .where("movies.id = :movieId", { movieId: movieId })
    .getOne();

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  for (const genreName of genreList) {
    
    const genre = await genreRepository.findOne({
      where: { name: genreName },
    });

    if (!genre) {
      throw new AppError(`Genre ${genreName} not found`, 404);
    }

    movie.genres = [...movie.genres, genre];
  }

  await movieRepository.save(movie);

  return `Genres added to movie succesfully`;
};

export default addGenreToMovieService;
