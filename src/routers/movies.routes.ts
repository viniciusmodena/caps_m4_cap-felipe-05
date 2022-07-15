import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMovieController,
  listOneMovieController,
  updateMovieController,
} from "../controllers/movies.controllers";
import { validate } from "../middlewares/validate.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movie.schema";

const moviesRouter = Router();

moviesRouter.post("", validate(movieCreateSchema), createMovieController);
moviesRouter.get("", listMovieController);
moviesRouter.get("/:id", listOneMovieController);
moviesRouter.patch("/:id", validate(movieUpdateSchema), updateMovieController);
moviesRouter.delete("/:id", deleteMovieController);

export default moviesRouter;
