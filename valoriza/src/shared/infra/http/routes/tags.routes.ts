import { Router } from "express";
import { CreateTagController } from "@modules/tags/usecases/createTag/CreateTagController";
import { ListTagsController } from "@modules/tags/usecases/listTags/ListTagsController";
import nameValidator from "@shared/validators/nameValidator";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http//middlewares/ensureAuthenticated";

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

tagsRoutes.post("/", ensureAuthenticated, ensureAdmin, nameValidator, createTagController.handle);
tagsRoutes.get("/", ensureAuthenticated, listTagsController.handle);

export { tagsRoutes };
