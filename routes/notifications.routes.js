const {
  addNewNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
} = require("../controllers/notifications.controller");

const router = require("express").Router();

router.post("/", addNewNotification);

router.get("/", getAllNotifications);

router.get("/:id", getNotificationById);

router.put("/:id", updateNotificationById);

router.delete("/:id", deleteNotificationById);

module.exports = router;
