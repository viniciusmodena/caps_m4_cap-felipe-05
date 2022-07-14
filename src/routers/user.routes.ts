import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listOneUserController,
  listUsersConstroller,
  updateInfoUserController,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import userCreateSchema from "../schemas/user.schema";

const userRouter = Router();

userRouter.post("", validate(userCreateSchema), createUserController);
userRouter.get("", listUsersConstroller);
userRouter.get("/:id", listOneUserController);
userRouter.patch("/:id", updateInfoUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;
