import { Router } from "express";

import { ListUserReceiverComplimentsController } from "@modules/compliments/usecases/listUserReceiverCompliments";
import { ListUserSenderComplimentsController } from "@modules/compliments/usecases/listUserSenderCompliments";
import { CreateComplimentController } from "@modules/compliments/usecases/createCompliment";
import { ensureAuthenticated } from "@shared/infra/http/middlewares";
import complimentValidator from "@shared/validators/complimentValidator";

const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const createComplimentController = new CreateComplimentController();

const complimentsRoutes = Router();

complimentsRoutes.get("/send", ensureAuthenticated, listUserSenderComplimentsController.handle);
complimentsRoutes.get("/receiver", ensureAuthenticated, listUserReceiverComplimentsController.handle);
complimentsRoutes.post("/", ensureAuthenticated, complimentValidator, createComplimentController.handle);

export { complimentsRoutes };
