import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listOneUserController,
  listUsersConstroller,
  updateInfoUserController,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", listUsersConstroller);
userRouter.get("/:id", listOneUserController);
userRouter.patch("/:id", updateInfoUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;
