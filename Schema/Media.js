const { Schema, model } = require("mongoose");

const mediaSchema = new Schema(
  {
    news_id: {
      type: String,
    },
    media_type: {
      type: String,
      enum: ["text", "image", "audio", "video"],
    },
    media_url: {
      type: String,
    },
    uploaded_at: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Media", mediaSchema);
