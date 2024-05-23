// 3. Party
import e from "express";
const router = e.Router();

import * as admin from "../controllers/adminController.js";

router.get("/user", admin.getAllUsers);
router.post("/user", admin.addUser);
router.get("/user/:id", admin.getUser);
router.delete("/user/:id", admin.deleteUser);
router.put("/user/:id", admin.updateUser);

export default router;
