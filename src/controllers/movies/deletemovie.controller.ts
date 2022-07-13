import { Request, Response } from "express";
import deleteMovieService from "../../services/movie/deletemovie.service";

const deleteMovieController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await deleteMovieService(id);

    return res.status(200).json({ message: "Movie deleted with sucess!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default deleteMovieController;
