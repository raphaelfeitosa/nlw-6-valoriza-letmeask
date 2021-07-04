import { CreateUserController } from "@modules/users/usecases/createUser/CreateUserController";
import { ListUsersController } from "@modules/users/usecases/listUsers/ListUsersController";
import userValidator from "@shared/validators/userValidator";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.post("/", userValidator, createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, listUsersController.handle);

export { usersRoutes };
