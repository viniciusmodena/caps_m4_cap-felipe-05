import { AppDataSource } from '../../data-source'
import { Movie } from '../../entities/movie.entity'
import { Genre } from '../../entities/genre.entity'
import { IGenre_Movie_Ids } from '../../interfaces/genre'
import { AppError } from '../../errors/appError'

const addGenreToMovieService = async ({
  movieId,
  genreId,
}: IGenre_Movie_Ids) => {
  const movieRepository = AppDataSource.getRepository(Movie)
  const genreRepository = AppDataSource.getRepository(Genre)

  const genre = await genreRepository.findOne({where: {id: genreId}})

  if (!genre) {
    throw new AppError('genre not found', 404)
  }

  const movie = await movieRepository
    .createQueryBuilder('movies')
    .leftJoinAndSelect('movies.genres', 'genres')
    .where('movies.id = :movieId', { movieId: movieId })
    .getOne()
  
  if (!movie) {
    throw new AppError('movie not found', 404)
  }
  
  movie.genres = [...movie.genres, genre]

  await movieRepository.save(movie)

  return `Genre ${genre.name} add to move ${movie.title} succesfully`

}

export default addGenreToMovieService
