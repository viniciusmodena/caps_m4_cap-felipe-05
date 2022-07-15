import * as yup from "yup";
import { IUser, IUserUpdate } from "../interfaces/user";
import { SchemaOf } from "yup";
export const userCreateSchema: SchemaOf<IUser> = yup.object().shape({
  user_name: yup.string().required().max(50),
  email: yup
    .string()
    .email()
    .required()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    })
    .max(50),
  password: yup.string().required().min(4).max(12),
  is_adm: yup.boolean().required(),
});

export const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  user_name: yup.string().max(50),
  email: yup
    .string()
    .email()
    .transform((value, originalValue) => {
      return originalValue.toLowerCase();
    })
    .max(50),
  password: yup.string().min(4).max(12),
  is_adm: yup.boolean(),
});
