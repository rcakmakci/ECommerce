import e from "express";
const router = e.Router();
import * as auth from "../controllers/authController.js";
import { notAuth } from "../middlewares/authentication.js";

router.post("/register", notAuth, auth.register);
router.post("/login", notAuth, auth.login);

export default router;
