import { AppDataSource } from '../../data-source'
import { Genre } from '../../entities/genre.entity'
import { AppError } from '../../errors/appError'

const listMoviesByGenreService = async (genreId: string) => {
  const genreRepository = AppDataSource.getRepository(Genre)

  const genre = await genreRepository
    .createQueryBuilder('genres')
    .innerJoinAndSelect('genres.movies', 'movies')
    .where('genres.id = :genreId', { genreId: genreId })
    .getOne()
  
  if(!genre) {
    throw new AppError('Genre not found', 404)
  }

  return genre
}

export default listMoviesByGenreService
