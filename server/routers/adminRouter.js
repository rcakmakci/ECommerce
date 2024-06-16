// 3. Party
import e from "express";
const router = e.Router();

import * as admin from "../controllers/adminController.js";
import { requireAuth } from "../middlewares/authentication.js";

router.use(requireAuth);
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

// ! Admin Shop
router.get("/seller-without-shop", admin.getSellersWithoutShops);
router.get("/shop", admin.getAllShop);
router.get("/shop/:id", admin.getShop);
router.post("/shop", admin.addShop);
router.put("/shop/:id", admin.updateShop);
router.delete("/shop/:id", admin.deleteShop);

// ! Admin Product
router.get("/product", admin.getAllProduct);
router.get("/product/:id", admin.getProduct);
router.post("/product", admin.addProduct);
router.put("/product/:id", admin.updateProduct);
router.delete("/product/:id", admin.deleteProduct);

export default router;
