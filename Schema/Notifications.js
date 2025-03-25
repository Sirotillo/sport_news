const { Schema, model } = require("mongoose");

const notificationsSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    news_id: {
      type: String,
    },
    msg_type: {
      type: String,
      enum: ["like", "follow"]
    },
    is_checked: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Notifacations", notificationsSchema);
