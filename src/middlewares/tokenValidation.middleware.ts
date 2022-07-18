import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log('token no middleware: ', token)

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (error: any, decoded: any) => {
        req.userData = { is_adm: decoded.adm, user_id: decoded.id };
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default tokenValidation;
