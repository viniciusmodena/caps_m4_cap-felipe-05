import listMovieService from "../../services/movie/listMovie.service";
import { Request, Response } from "express";

const listMovieController = async (req: Request, res: Response) => {
  try {
    const movies = await listMovieService();

    return res.status(200).json(movies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default listMovieController;
