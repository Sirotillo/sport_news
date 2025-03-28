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
const notifacationsRouter = require("./notifications.routes");
const tagsRouter = require("./tags.routes");
const newTagsRoute = require("./newTags.routes");
const otpRoute = require("./otp.routes");

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
router.use("/notifications", notifacationsRouter);
router.use("/tags", tagsRouter);
router.use("/newTags", newTagsRoute);
router.use("/otp", otpRoute);

module.exports = router;
