import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AppError } from "../errors/appError";
export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await schema.validate(body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (e) {
      next(new AppError((e as any).message, (e as any).statusCode));
    }
  };
