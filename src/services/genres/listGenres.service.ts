import { AppDataSource } from "../../data-source"
import { Genre } from "../../entities/genre.entity"

const listGenreService = async () => {

  const genreRepository = AppDataSource.getRepository(Genre)

  const genres = genreRepository.find()

  return genres
}

export default listGenreService