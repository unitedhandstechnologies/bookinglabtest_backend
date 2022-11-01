const express = require("express");
const router = express.Router();
const categoryService = require("../../services/CategoryService/categoryService");
router.post(
  "/api/categories/categoryType/:category_type_id/UserType/:user_type_id/categoryItems/create",
  categoryService.createCategory
);
router.get(
  "/api/categories/categoryType/:category_type_id/UserType/:user_type_id/categoryItems/getAllCategory",
  categoryService.getAllCategory
);
router.get(
  "/api/categories/getCategoryById/:id",
  categoryService.getCategoryById
);
router.put(
  "/api/categories/replaceCategory/:id",
  categoryService.replaceCategory
);
router.patch(
  "/api/categories/updateCategory/:id",
  categoryService.updateCategory
);
router.delete(
  "/api/categories/deleteCategory/:id",
  categoryService.deleteCategory
);
module.exports = router;
