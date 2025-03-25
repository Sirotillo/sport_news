const { Schema, model } = require("mongoose");

const viewsSchema = new Schema(
  {
    news_id: {
      type: String,
    },
    user_id: {
      type: String,
    },
    viewed_at: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Views", viewsSchema);
