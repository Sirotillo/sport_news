const { Schema, model } = require("mongoose");

const likesSchema = new Schema(
  {
    news_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    liked_at: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Likes", likesSchema);
