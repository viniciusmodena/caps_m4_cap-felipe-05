import { Request, Response } from "express";

import createMovieService from "../../services/movie/createMovie.service";

const createMovieController = async (req: Request, res: Response) => {
  try {
    const { title, release_year, synopse, image_url } = req.body;

    const newMovie = await createMovieService({
      title,
      release_year,
      synopse,
      image_url,
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default createMovieController;
