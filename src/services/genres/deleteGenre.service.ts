import { AppDataSource } from "../../data-source";
import { Genre } from "../../entities/genre.entity";
import { AppError } from "../../errors/appError";

const deleteGenreService = async (genreId: string) => {
  const genreRepository = AppDataSource.getRepository(Genre);

  const genre = await genreRepository.findOne({ where: { id: genreId } });

  if (!genre) {
    throw new AppError("Genre not found", 404);
  }
  await genreRepository.remove(genre);

  return { message: "Genre has been removed" };
};

export default deleteGenreService;
