import { Router } from "express";

import { createSessionController } from "../controllers/session.controller";
import { validate } from "../middlewares/validate.middleware";
import createSessionSchema from "../schemas/session.schema";

const sessionRouter = Router();

sessionRouter.post("", validate(createSessionSchema), createSessionController);

export default sessionRouter;
