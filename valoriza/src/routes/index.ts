import { Router } from "express";
import { AuthenticateUserController } from "../controller/AuthenticateUserController";
import { CreateComplimentController } from "../controller/CreateComplimentController";
import { CreateTagController } from "../controller/CreateTagController";
import { CreateUserController } from "../controller/CreateUserController";
import { ListTagsController } from "../controller/ListTagsController";
import { ListUserReceiverComplimentsController } from "../controller/ListUserReceiverComplimentsController";
import { ListUsersController } from "../controller/ListUsersController";
import { ListUserSenderComplimentsController } from "../controller/ListUserSenderComplimentsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import complimentValidator from "../validators/complimentValidator";
import emailAndPasswordValidator from "../validators/emailAndPasswordValidator";
import nameValidator from "../validators/nameValidator";
import userValidator from "../validators/userValidator";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", userValidator, createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);
router.get("/users/compliments/send", ensureAuthenticated, listUserSenderComplimentsController.handle);
router.get("/users/compliments/receiver", ensureAuthenticated, listUserReceiverComplimentsController.handle);

router.post("/tags", ensureAuthenticated, ensureAdmin, nameValidator, createTagController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/login", emailAndPasswordValidator, authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, complimentValidator, createComplimentController.handle);


export { router };