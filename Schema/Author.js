const { Schema, model } = require("mongoose");

const authorsSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    is_editor: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Authors", authorsSchema);
