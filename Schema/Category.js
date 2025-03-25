const { Schema, model } = require("mongoose");

const categorysSchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    parent_id: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Categorys", categorysSchema);
