import { Router } from "express";
import { AuthenticateUserController } from "@modules/users/usecases/authenticateUser/AuthenticateUserController";
import emailAndPasswordValidator from "@shared/validators/emailAndPasswordValidator";

const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRoutes.post("/", emailAndPasswordValidator, authenticateUserController.handle);

export { sessionsRoutes };
