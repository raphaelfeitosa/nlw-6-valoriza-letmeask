import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares";
import userValidator from "@shared/validators/userValidator";

import { CreateUserController } from "@modules/users/usecases/createUser";
import { ListUsersController } from "@modules/users/usecases/listUsers";
import pageValidator from "@shared/validators/pageValidator";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post("/", userValidator, createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, pageValidator, listUsersController.handle);

export { usersRoutes };
 