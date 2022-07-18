import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMovieController,
  listOneMovieController,
  updateMovieController,
} from "../controllers/movies.controllers";
import authenticationIsAdm from "../middlewares/authenticationIsAdm.middleware";
import tokenValidation from "../middlewares/tokenValidation.middleware";
import { validate } from "../middlewares/validate.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movie.schema";

const moviesRouter = Router();

moviesRouter.post(
  "",
  tokenValidation,
  authenticationIsAdm,
  validate(movieCreateSchema),
  createMovieController
);
moviesRouter.get("", listMovieController);
moviesRouter.get("/:id", listOneMovieController);
moviesRouter.patch(
  "/:id",
  tokenValidation,
  authenticationIsAdm,
  validate(movieUpdateSchema),
  updateMovieController
);
moviesRouter.delete(
  "/:id",
  tokenValidation,
  authenticationIsAdm,
  deleteMovieController
);

export default moviesRouter;
