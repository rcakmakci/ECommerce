// 3. Party
import e from "express";
const router = e.Router();

import * as user from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authentication.js";

router.get("/", requireAuth, user.getAllUser);

export default router;
