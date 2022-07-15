import { Router } from "express";
import {
  addGenreToMovieController,
  createGenreController,
  deleteGenreController,
  listGenreController,
  listMoviesByGenreController,
} from "../controllers/genre.controllers";
import { validate } from "../middlewares/validate.middleware";
import { genreCreateSchema } from "../schemas/genre.schema";

const genreRouter = Router();

genreRouter.post("", validate(genreCreateSchema), createGenreController);
genreRouter.post("/movie/:movieId", addGenreToMovieController);
genreRouter.get("/:genreId", listMoviesByGenreController);
genreRouter.get("", listGenreController);
genreRouter.delete("/:genreId", deleteGenreController);

export default genreRouter;
