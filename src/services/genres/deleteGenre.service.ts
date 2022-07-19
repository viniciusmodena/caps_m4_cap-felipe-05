import { AppDataSource } from '../../data-source'
import { Genre } from '../../entities/genre.entity'
import { AppError } from '../../errors/appError'
import { isUuid } from 'uuidv4'

const deleteGenreService = async (genreId: string): Promise<void> => {
  const genreRepository = AppDataSource.getRepository(Genre)

  const uuidCheck = isUuid(genreId)

  if (!uuidCheck) {
    throw new AppError('Genre not found', 404)
  }

  const genre = await genreRepository.findOne({ where: { id: genreId } })

  if (!genre) {
    throw new AppError('Genre not found', 404)
  }
  await genreRepository.remove(genre)
}

export default deleteGenreService
