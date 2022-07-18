import * as yup from "yup";
import { IReviewRequest } from "../interfaces/review";
import { SchemaOf } from "yup";
const reviewCreateSchema: SchemaOf<IReviewRequest> = yup.object().shape({
  title: yup.string().max(50),
  description: yup.string().max(1000),
  rating: yup.number().integer().required().positive().lessThan(11),
});
export default reviewCreateSchema;
