const { Schema, model } = require("mongoose");

const newTagsSchema = new Schema(
  {
    news_id: {
      type: Number,
    },
    tag_id: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("newTags", newTagsSchema);
