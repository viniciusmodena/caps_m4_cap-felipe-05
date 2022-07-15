import * as yup from "yup";
import { IGenre, IGenreUpdate } from "../interfaces/genre";
import { SchemaOf } from "yup";
export const genreCreateSchema: SchemaOf<IGenre> = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(50)
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
});

export const genreUpdateSchema: SchemaOf<IGenreUpdate> = yup.object().shape({
  name: yup
    .string()
    .max(50)
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
});
