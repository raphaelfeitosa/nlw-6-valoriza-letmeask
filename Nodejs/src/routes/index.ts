import { Router } from "express";
import { AuthenticateUserController } from "../controller/AuthenticateUserController";
import { CreateComplimentController } from "../controller/CreateComplimentController";
import { CreateTagController } from "../controller/CreateTagController";
import { CreateUserController } from "../controller/CreateUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import complimentValidator from "../validators/complimentValidator";
import emailAndPasswordValidator from "../validators/emailAndPasswordValidator";
import nameValidator from "../validators/nameValidator";
import userValidator from "../validators/userValidator";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/users", userValidator, createUserController.handle);
router.post("/tags", ensureAdmin, nameValidator, createTagController.handle);
router.post("/login", emailAndPasswordValidator, authenticateUserController.handle);
router.post("/compliments", complimentValidator, createComplimentController.handle);

export { router };