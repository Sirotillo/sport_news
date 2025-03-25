const { Schema, model } = require("mongoose");

const newsWithLangsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sumary_news: {
      type: String,
      required: true,
    },
    lang_id: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("NewsWithLangs", newsWithLangsSchema);
