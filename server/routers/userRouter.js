// 3. parti
import e from "express";
const router = e.Router();

// Core
import * as userController from "../controllers/userController.js";

router.get("/", userController.getAllUser);

export default router;
