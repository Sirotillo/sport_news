const { addNewNewTag, getAllNewTags, getNewTagById, updateNewTagById, deleteNewTagById } = require("../controllers/newTags.controller");

const router = require("express").Router();

router.post("/", addNewNewTag);

router.get("/", getAllNewTags);

router.get("/:id", getNewTagById);

router.put("/:id", updateNewTagById);

router.delete("/:id", deleteNewTagById);

module.exports = router;
