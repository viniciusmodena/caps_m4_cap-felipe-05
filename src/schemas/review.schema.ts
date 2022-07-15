import * as yup from "yup";
import { IReview } from "../interfaces/review";
import { SchemaOf } from "yup";
const reviewCreateSchema: SchemaOf<IReview> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  rating: yup.number().integer().required().positive().lessThan(11),
  movie_id: yup.string().required(),
  user_id: yup.string().required(),
});
export default reviewCreateSchema;
