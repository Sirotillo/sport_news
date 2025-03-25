const { errorHandler } = require("../helpers/error_handler");
const Notification = require("../Schema/Notifications");
const { notificationValidation } = require("../Validations/notification.validation");
const mongoose = require("mongoose");

const addNewNotification = async (req, res) => {
  try {
    const { user_id, news_id, msg_type, is_checked, created_at } = req.body;
    const newNotification = await pool.query(
      `
            INSERT INTO notifications(user_id, news_id, msg_type, is_checked, created_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
      [user_id, news_id, msg_type, is_checked, created_at]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newNotification.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const allNotifications = await Notification.find({});

    res.status(201).send({ message: "Hama tilar", allNotifications });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getNotificationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const notification = await Notification.findById(id);
    res.send({ notification });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNotificationById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = notificationValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { notification } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ notification });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNotificationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const notification = await Notification.findByIdAndDelete({ _id: id });

    res.send({ notification });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
