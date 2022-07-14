import * as yup from "yup";
import { IUser } from "../interfaces/user";
import { SchemaOf } from "yup";
const userCreateSchema: SchemaOf<IUser> = yup.object().shape({
  user_name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    }),
  password: yup.string().required().min(4).max(12),
  is_adm: yup.boolean().required(),
});
export default userCreateSchema;
