const { addNewLang, getAllLanguages, getLanguageById, updateLanguageById, deleteLanguageById } = require("../controllers/langs.controller");

const router = require("express").Router();

router.post("/", addNewLang)

router.get("/", getAllLanguages)

router.get("/:id", getLanguageById)

router.put("/:id", updateLanguageById)

router.delete("/:id", deleteLanguageById)


module.exports = router