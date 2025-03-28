const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    interests: {
      type: Number,
    },
    phone_number: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Users", usersSchema);
