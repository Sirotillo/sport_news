const { Schema, model } = require("mongoose");

const languagesSchema = new Schema(
  {
    _name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      default: "uz",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Languages", languagesSchema);
