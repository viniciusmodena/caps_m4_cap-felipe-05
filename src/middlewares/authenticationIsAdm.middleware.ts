import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const authenticationIsAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIsAdm = req.userData.is_adm;

  if (userIsAdm) {
    next();
  }
  throw new AppError("Unauthorized", 401);
};

export default authenticationIsAdm;
