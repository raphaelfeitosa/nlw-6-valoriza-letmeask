import { Router } from "express";

import { ListUserReceiverComplimentsController } from "@modules/compliments/usecases/listUserReceiverCompliments";
import { ListUserSenderComplimentsController } from "@modules/compliments/usecases/listUserSenderCompliments";
import { ListComplimentsController } from "@modules/compliments/usecases/listCompliments";
import { CreateComplimentController } from "@modules/compliments/usecases/createCompliment";
import { ensureAuthenticated } from "@shared/infra/http/middlewares";
import complimentValidator from "@shared/validators/complimentValidator";
import pageValidator from "@shared/validators/pageValidator";

const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listComplimentsController = new ListComplimentsController();
const createComplimentController = new CreateComplimentController();

const complimentsRoutes = Router();

complimentsRoutes.get("/",
  ensureAuthenticated,
  pageValidator,
  listComplimentsController.handle
);
complimentsRoutes.get("/send",
  ensureAuthenticated,
  pageValidator,
  listUserSenderComplimentsController.handle
);
complimentsRoutes.get("/receiver",
  ensureAuthenticated,
  pageValidator,
  listUserReceiverComplimentsController.handle
);
complimentsRoutes.post("/",
  ensureAuthenticated,
  complimentValidator,
  createComplimentController.handle
);

export { complimentsRoutes };
