import { Router } from "express";
import createMovieController from "../controllers/movies/createmovie.controller";

const routes = Router();

routes.post("/movies", createMovieController);

export default routes;
