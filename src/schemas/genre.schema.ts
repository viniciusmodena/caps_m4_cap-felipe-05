import * as yup from "yup";
import { IGenre } from "../interfaces/genre";
import { SchemaOf } from "yup";
const genreCreateSchema: SchemaOf<IGenre> = yup.object().shape({
  name: yup.string().required(),
});
export default genreCreateSchema;
