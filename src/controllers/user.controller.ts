import { Request, Response } from "express";
import createUserService from "../services/user/createUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import listOneUserService from "../services/user/listOneUser.service";
import listUsersService from "../services/user/listUsers.service";
import updateInfoUserService from "../services/user/updateInfoUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { user_name, email, password, is_adm } = req.body;
  const user = await createUserService({ user_name, email, password, is_adm });

  return res.status(201).json(user);
};

export const listUsersConstroller = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

export const listOneUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await listOneUserService(userId);

  return res.status(200).json(user);
};

export const updateInfoUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data = req.body;
  const user = await updateInfoUserService(userId, data);

  return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userDeleted = await deleteUserService(userId);

  if (userDeleted) {
    return res.status(200).json({ message: "User deleted" });
  }
};
