import { AppDataSource } from '../../data-source'
import { Genre } from '../../entities/genre.entity'
import { AppError } from '../../errors/appError'

const createGenreService = async (name: string) => {
  const genreRepository = AppDataSource.getRepository(Genre)

  const checkName = await genreRepository.findOne({
    where: {
      name: name,
    },
  })

  if (checkName) {
    throw new AppError('Genre already exists')
  }

  const genre = await genreRepository.save({
    name,
  })

  return genre
}

export default createGenreService
