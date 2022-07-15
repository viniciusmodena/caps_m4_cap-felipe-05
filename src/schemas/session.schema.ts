import * as yup from "yup";
import { IUserLogin } from "../interfaces/user";
import { SchemaOf } from "yup";
const createSessionSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required().max(50),
  password: yup.string().required().min(4).max(12),
});
export default createSessionSchema;
