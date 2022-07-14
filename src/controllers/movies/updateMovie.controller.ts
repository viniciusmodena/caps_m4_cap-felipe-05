import { Request, Response } from "express";
import updateMovieService from "../../services/movie/updateMovie.service";

const updateMovieController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, release_year, synopse, image_url } = req.body;
    const newMovie = await updateMovieService(
      id,
      title,
      release_year,
      synopse,
      image_url
    );
    return res.status(200).json({ newMovie, message: "Movie updated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default updateMovieController;
