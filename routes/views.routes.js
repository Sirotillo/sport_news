const { addNewView, getAllViews, getViewById, updateViewById, deleteViewById } = require("../controllers/views.controller");

const router = require("express").Router();

router.post("/", addNewView);

router.get("/", getAllViews);

router.get("/:id", getViewById);

router.put("/:id", updateViewById);

router.delete("/:id", deleteViewById);

module.exports = router;
