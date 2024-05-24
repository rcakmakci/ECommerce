// 3. Party
import e from "express";
const router = e.Router();

import * as admin from "../controllers/adminController.js";

// ! Admin User
router.get("/user", admin.getAllUsers);
router.post("/user", admin.addUser);
router.get("/user/:id", admin.getUser);
router.delete("/user/:id", admin.deleteUser);
router.put("/user/:id", admin.updateUser);

// ! Admin Category
router.post("/category/bulk", admin.addBulkCategory);
router.get("/category", admin.getAllCategory);
router.get("/category/:id", admin.getCategory);
router.post("/category", admin.addCategory);
router.delete("/category/:id", admin.deleteCategory);
router.put("/category/:id", admin.updateCategory);

// ! Admin Sub Category
router.post("/sub-category", admin.addSubCategory);
router.get("/sub-category", admin.getAllSubCategory);
router.get("/sub-category/:id", admin.getSubCategory);
router.put("/sub-category/:id", admin.updateSubCategory);
router.delete("/sub-category/:id", admin.deleteSubCategory);

// ! Admin Sub Sub Category
router.post("/sub-sub-category", admin.addSubSubCategory);
router.get("/sub-sub-category", admin.getAllSubSubCategory);
router.get("/sub-sub-category/:id", admin.getSubSubCategory);
router.put("/sub-sub-category/:id", admin.updateSubSubCategory);
router.delete("/sub-sub-category/:id", admin.deleteSubSubCategory);

// ! Admin Three Sub Category
router.post("/three-sub-category", admin.addThreeSubCategory);
router.get("/three-sub-category", admin.getAllThreeSubCategory);
router.get("/three-sub-category/:id", admin.getThreeSubCategory);
router.put("/three-sub-category/:id", admin.updateThreeSubCategory);
router.delete("/three-sub-category/:id", admin.deleteThreeSubCategory);

export default router;
