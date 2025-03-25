const { addNewCategory, getAllCategorys, getCategoryById, updateCategoryById, deleteCategoryById } = require("../controllers/categorys.controller");

const router = require("express").Router();

router.post("/", addNewCategory);

router.get("/", getAllCategorys);

router.get("/:id", getCategoryById);

router.put("/:id", updateCategoryById);

router.delete("/:id", deleteCategoryById);

module.exports = router;
