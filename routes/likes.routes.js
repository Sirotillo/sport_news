const { addNewLike, getAllLikes, getLikeById, updateLikeById, deleteLikeById } = require("../controllers/likes.controller");

const router = require("express").Router();

router.post("/", addNewLike);

router.get("/", getAllLikes);

router.get("/:id", getLikeById);

router.put("/:id", updateLikeById);

router.delete("/:id", deleteLikeById);

module.exports = router;
