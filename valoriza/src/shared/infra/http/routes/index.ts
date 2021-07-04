import { Router } from "express";

import { sessionsRoutes } from "./sessions.routes";
import { tagsRoutes } from "./tags.routes";
import { usersRoutes } from "./users.routes";
import { complimentsRoutes } from "./compliments.routes";

const router = Router();

router.use('/sessions', sessionsRoutes);
router.use('/users', usersRoutes);
router.use('/tags', tagsRoutes);
router.use('/compliments', complimentsRoutes);

export { router };
