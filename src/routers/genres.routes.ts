import { Router } from "express";
import {
  addGenreToMovieController,
  createGenreController,
  deleteGenreController,
  listGenreController,
  listMoviesByGenreController,
} from "../controllers/genre.controllers";
import authenticationIsAdm from "../middlewares/authenticationIsAdm.middleware";
import isUuidMiddleware from "../middlewares/isUUID.middleware";
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
  isUuidMiddleware,
  tokenValidation,
  authenticationIsAdm,
  addGenreToMovieController
);
genreRouter.get("/:genreId", isUuidMiddleware, listMoviesByGenreController);
genreRouter.get("", listGenreController);
genreRouter.delete(
  "/:genreId",
  isUuidMiddleware,
  tokenValidation,
  authenticationIsAdm,
  deleteGenreController
);

export default genreRouter;
