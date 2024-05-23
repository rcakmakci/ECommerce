// 3. Party
import e from "express";
const router = e.Router();

import * as user from "../controllers/userController.js";

router.get("/", user.getAllUser);

export default router;
