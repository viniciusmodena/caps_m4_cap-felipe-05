import * as yup from "yup";
import { SchemaOf } from "yup";
import { IMovie, IMovieUpdate } from "../interfaces/movie";

export const movieCreateSchema: SchemaOf<IMovie> = yup.object().shape({
  title: yup.string().required().max(150),
  release_year: yup.number().integer().min(1800).max(4000).required(),
  synopse: yup.string().required().max(1000),
  image_url: yup.string().required().max(256),
});

export const movieUpdateSchema: SchemaOf<IMovieUpdate> = yup.object().shape({
  title: yup.string().max(150),
  release_year: yup.number().integer().min(1800).max(4000),
  synopse: yup.string().max(1000),
  image_url: yup.string().max(256),
});

