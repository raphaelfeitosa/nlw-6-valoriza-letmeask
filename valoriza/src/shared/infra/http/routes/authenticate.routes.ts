import { Router } from "express";

import { AuthenticateUserController } from "@modules/users/usecases/authenticateUser";
import emailAndPasswordValidator from "@shared/validators/emailAndPasswordValidator";
import { RefreshTokenController } from "@modules/users/usecases/refreshToken";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", emailAndPasswordValidator, authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
