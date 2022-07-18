import { Router } from "express";
import {
  addGenreToMovieController,
  createGenreController,
  deleteGenreController,
  listGenreController,
  listMoviesByGenreController,
} from "../controllers/genre.controllers";
import authenticationIsAdm from "../middlewares/authenticationIsAdm.middleware";
import tokenValidation from "../middlewares/tokenValidation.middleware";
import { validate } from "../middlewares/validate.middleware";
import { genreCreateSchema } from "../schemas/genre.schema";

const genreRouter = Router();

genreRouter.post(
  "",
  tokenValidation,
  authenticationIsAdm,
  validate(genreCreateSchema),
  createGenreController
);
genreRouter.post(
  "/movie/:movieId",
  tokenValidation,
  authenticationIsAdm,
  addGenreToMovieController
);
genreRouter.get("/:genreId", listMoviesByGenreController);
genreRouter.get("", listGenreController);
genreRouter.delete(
  "/:genreId",
  tokenValidation,
  authenticationIsAdm,
  deleteGenreController
);

export default genreRouter;
