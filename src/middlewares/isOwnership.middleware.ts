import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const isOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIdLogin = req.userData.user_id;

  if (!req.params.review_id) {
    throw new AppError("invalid review id!");
  }

  const userIdParams = req.params.id;

  if (req.userData.is_adm || userIdLogin === userIdParams) {
    next();
  }
  throw new AppError("Access denied!");
};

export default isOwnershipMiddleware;
