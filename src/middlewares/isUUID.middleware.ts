import { validate as uuidValidate } from "uuid";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const isUuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.params.id) {
    const uuidCheck = uuidValidate(req.params.id);
    if (!uuidCheck) {
      throw new AppError("Id passed in the params must be in uuid format");
    }
  }

  if (req.params.user_id) {
    const uuidCheck = uuidValidate(req.params.user_id);
    if (!uuidCheck) {
      throw new AppError("Id passed in the params must be in uuid format");
    }
  }

  if (req.params.review_id) {
    const uuidCheck = uuidValidate(req.params.review_id);
    if (!uuidCheck) {
      throw new AppError("Id passed in the params must be in uuid format");
    }
  }

  if (req.params.genre_id) {
    const uuidCheck = uuidValidate(req.params.genre_id);
    if (!uuidCheck) {
      throw new AppError("Id passed in the params must be in uuid format");
    }
  }

  if (req.params.movie_id) {
    const uuidCheck = uuidValidate(req.params.movie_id);
    if (!uuidCheck) {
      throw new AppError("Id passed in the params must be in uuid format");
    }
  }

  next();
};

export default isUuidMiddleware;
