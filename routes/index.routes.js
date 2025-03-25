const router = require("express").Router();

const langRouter = require("./langs.routes");
const userRouter = require("./users.routes");
const categoryRouter = require("./categorys.routes");
const newsRouter = require("./news.routes");
const newsWithLangsRouter = require("./newsWithLangs.routes");
const mediaRouter = require("./media.routes");
const commentsRouter = require("./comments.routes");
const reportsRouter = require("./reports.routes");
const likesRouter = require("./likes.routes");
const viewsRouter = require("./views.routes");

router.use("/langs", langRouter);
router.use("/users", userRouter);
router.use("/category", categoryRouter);
router.use("/news", newsRouter);
router.use("/newsWithLangsRouter", newsWithLangsRouter);
router.use("/media", mediaRouter);
router.use("/comments", commentsRouter);
router.use("/reports", reportsRouter);
router.use("/likes", likesRouter);
router.use("/views", viewsRouter);

module.exports = router;
