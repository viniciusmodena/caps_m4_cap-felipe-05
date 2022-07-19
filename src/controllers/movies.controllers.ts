import { Request, Response } from "express";
import createMovieService from "../services/movies/createMovie.service";
import deleteMovieService from "../services/movies/deletemovie.service";
import listMovieService from "../services/movies/listMovie.service";
import listOneMovieService from "../services/movies/listOneMovie.service";
import searchMoviesService from "../services/movies/searchMovies.service";
import updateMovieService from "../services/movies/updateMovie.service";

export const createMovieController = async (req: Request, res: Response) => {
  const { title, release_year, synopse, image_url } = req.reqData;

  const newMovie = await createMovieService({
    title,
    release_year,
    synopse,
    image_url,
  });

  return res.status(201).json(newMovie);
};

export const updateMovieController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, release_year, synopse, image_url } = req.reqData;
  const newMovie = await updateMovieService(
    id,
    title,
    release_year,
    synopse,
    image_url
  );
  return res.status(200).json({ newMovie, message: "Movie updated" });
};

export const listOneMovieController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movie = await listOneMovieService(id);

  return res.status(200).json(movie);
};

export const listMovieController = async (req: Request, res: Response) => {
  const { page, limit } = req.pagination;
  const movies = await listMovieService({ page, limit });

  return res.status(200).json(movies);
};

export const deleteMovieController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteMovieService(id);

  return res.status(200).json({ message: "Movie deleted" });
};

export const searchMoviesController = async (req: Request, res: Response) => {
  const searchTitle = req.params.search_title;
  const { page, limit } = req.pagination;

  const searchResult = await searchMoviesService(searchTitle, { page, limit });

  return res.status(200).json(searchResult);
};
