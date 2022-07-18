import { Request, Response } from "express";

import createSessionService from "../services/sessions/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
  const { email, password } = req.reqData;

  const token = await createSessionService({ email, password });

  return res.status(201).json({ token: token });
};
