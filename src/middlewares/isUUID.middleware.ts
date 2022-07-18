import { validate as uuidValidate } from "uuid";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const isUuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const uuidCheck = uuidValidate(id);

  if (!uuidCheck) {
    throw new AppError("Id passed in the params must be in uuid format");
  }

  next();
};

export default isUuidMiddleware;
