import { Request, Response } from "express";
import listOneMovieService from "../../services/movie/listOneMovie.service";

const listOneMovieController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await listOneMovieService(id);

    return res.status(200).json(movie);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};
export default listOneMovieController;
