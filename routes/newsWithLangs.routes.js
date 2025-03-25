const { addNewNewsWithLangs, getAllNewsWithLangss, getNewsWithLangsById, updateNewsWithLangsById, deleteNewsWithLangsById } = require("../controllers/newsWithLangs.controller");

const router = require("express").Router();

router.post("/", addNewNewsWithLangs);

router.get("/", getAllNewsWithLangss);

router.get("/:id", getNewsWithLangsById);

router.put("/:id", updateNewsWithLangsById);

router.delete("/:id", deleteNewsWithLangsById);

module.exports = router;
