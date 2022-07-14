import { Router } from "express";
import { createUserController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import userCreateSchema from "../schemas/user.schema";

const userRouter = Router();

userRouter.post("", validate(userCreateSchema), createUserController);

export default userRouter;
