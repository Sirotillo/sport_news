const { Schema, model } = require("mongoose");

const reportsSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    news_id: {
      type: String,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["text", "image", "audio", "video"]
    },
    created_at: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Reports", reportsSchema);
