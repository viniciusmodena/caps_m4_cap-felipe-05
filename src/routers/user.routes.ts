import { Router } from "express";
import { createUserController } from "../controllers/users/user.controller";

const userRouter = Router();

userRouter.post("", createUserController);

export default userRouter;
