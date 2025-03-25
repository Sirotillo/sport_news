const { Schema, model } = require("mongoose");

const tagsSchema = new Schema(
  {
    tag_name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Tags", tagsSchema);
