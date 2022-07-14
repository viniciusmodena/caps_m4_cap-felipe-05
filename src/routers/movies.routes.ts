import { Router } from "express";
import createMovieController from "../controllers/movies/createmovie.controller";
import deleteMovieController from "../controllers/movies/deletemovie.controller";
import listMovieController from "../controllers/movies/listMovie.controller";
import listOneMovieController from "../controllers/movies/listOneMovie.controller";
import updateMovieController from "../controllers/movies/updateMovie.controller";

const moviesRouter = Router();

moviesRouter.post("", createMovieController);
moviesRouter.get("", listMovieController);
moviesRouter.get("/:id", listOneMovieController);
moviesRouter.patch("/:id", updateMovieController);
moviesRouter.delete("/:id", deleteMovieController);

export default moviesRouter;
