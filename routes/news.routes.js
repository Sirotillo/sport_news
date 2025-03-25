const { addNewsNews, getAllNewss, getNewsById, updateNewsById, deleteNewsById } = require("../controllers/news.controller");

const router = require("express").Router();

router.post("/", addNewsNews);

router.get("/", getAllNewss);

router.get("/:id", getNewsById);

router.put("/:id", updateNewsById);

router.delete("/:id", deleteNewsById);

module.exports = router;