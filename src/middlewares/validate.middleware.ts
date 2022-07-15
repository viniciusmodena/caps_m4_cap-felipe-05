import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AppError } from "../errors/appError";
export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      const data = await schema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.userData = data;
      next();
    } catch (e) {
      next(new AppError((e as any).message, (e as any).statusCode));
    }
  };
