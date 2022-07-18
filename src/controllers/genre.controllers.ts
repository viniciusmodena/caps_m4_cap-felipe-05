import { Request, Response } from "express";
import addGenreToMovieService from "../services/genres/addGenreToMovie.service";
import createGenreService from "../services/genres/createGenre.service";
import deleteGenreService from "../services/genres/deleteGenre.service";
import listGenreService from "../services/genres/listGenres.service";
import listMoviesByGenreService from "../services/genres/listMoviesByGenre.service";

export const createGenreController = async (req: Request, res: Response) => {
  const { name } = req.reqData;

  const genre = await createGenreService(name);

  res.status(201).json(genre);
};

export const addGenreToMovieController = async (
  req: Request,
  res: Response
) => {
  const { genreList } = req.reqData;
  const { movieId } = req.params;

  const addGenre = await addGenreToMovieService({ movieId, genreList });

  res.status(201).json(addGenre);
};

export const listMoviesByGenreController = async (
  req: Request,
  res: Response
) => {
  const { genreId } = req.params;

  const genre = await listMoviesByGenreService(genreId);

  res.status(200).json(genre);
};

export const listGenreController = async (req: Request, res: Response) => {
  const genres = await listGenreService();

  res.json(genres);
};

export const deleteGenreController = async (req: Request, res: Response) => {
  const { genreId } = req.params;

  const genreDeleted = await deleteGenreService(genreId);

  return res.status(204).json({ message: "Genre deleted." });
};
