import { Router } from "express";

import { CreateTagController } from "@modules/tags/usecases/createTag";
import { ListAllTagsController } from "@modules/tags/usecases/listTags";
import { ensureAuthenticated, ensureAdmin } from "@shared/infra/http/middlewares";
import nameValidator from "@shared/validators/nameValidator";
import pageValidator from "@shared/validators/pageValidator";

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsController = new ListAllTagsController();

tagsRoutes.post("/", ensureAuthenticated, ensureAdmin, nameValidator, createTagController.handle);
tagsRoutes.get("/", ensureAuthenticated, pageValidator, listTagsController.handle);

export { tagsRoutes };
