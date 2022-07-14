import * as yup from "yup";
import { SchemaOf } from "yup";
import { IMovie } from "../interfaces/movie";
const movieCreateSchema: SchemaOf<IMovie> = yup.object().shape({
  title: yup.string().required(),
  release_year: yup.number().integer().positive().min(4).max(4).required(),
  synopse: yup.string().required(),
  img_url: yup.string().required(),
});
export default movieCreateSchema;
