const { addNewMedia, getAllMedias, getMediaById, updateMediaById, deleteMediaById } = require("../controllers/media.controller");

const router = require("express").Router();

router.post("/", addNewMedia);

router.get("/", getAllMedias);

router.get("/:id", getMediaById);

router.put("/:id", updateMediaById);

router.delete("/:id", deleteMediaById);

module.exports = router;
