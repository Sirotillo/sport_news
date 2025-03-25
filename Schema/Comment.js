const { Schema, model } = require("mongoose");

const commentsSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    news_id: {
      type: String,
    },
    content: {
      type: String,
    },
    created_at: {
      type: Date,
    },
    reply_comment_iid: {
      type: String,
    },
    is_approved: {
      type: Boolean,
    },
    id_deleted: {
      type: Boolean,
    },
    views: {
      type: Number,
    },
    likes: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Comments", commentsSchema);
