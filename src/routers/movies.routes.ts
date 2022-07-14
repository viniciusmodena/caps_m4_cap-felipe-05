import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMovieController,
  listOneMovieController,
  updateMovieController,
} from "../controllers/movies.controllers";

const moviesRouter = Router();

moviesRouter.post("", createMovieController);
moviesRouter.get("", listMovieController);
moviesRouter.get("/:id", listOneMovieController);
moviesRouter.patch("/:id", updateMovieController);
moviesRouter.delete("/:id", deleteMovieController);

export default moviesRouter;
