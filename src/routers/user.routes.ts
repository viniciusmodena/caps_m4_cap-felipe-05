import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listOneUserController,
  listUsersConstroller,
  updateInfoUserController,
} from "../controllers/user.controller";
import isOwnership from "../middlewares/isOwnership.middleware";
import tokenValidation from "../middlewares/tokenValidation.middleware";
import { validate } from "../middlewares/validate.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";

const userRouter = Router();

userRouter.post("", validate(userCreateSchema), createUserController);
userRouter.get("", listUsersConstroller);
userRouter.get("/:id", listOneUserController);
userRouter.patch(
  "/:id",
  tokenValidation,
  isOwnership,
  validate(userUpdateSchema),
  updateInfoUserController
);
userRouter.delete("/:id", tokenValidation, isOwnership, deleteUserController);

export default userRouter;
