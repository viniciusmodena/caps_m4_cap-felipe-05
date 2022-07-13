import { Request, Response } from "express";
import createUserService from "../services/user/createUser.service";
import listOneUserService from "../services/user/listOneUser.service";
import listUsersService from "../services/user/listUsers.service";

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
  // const user = await updateInfoUserService(userId, data)

  // return res.status(200).json(user)
};
