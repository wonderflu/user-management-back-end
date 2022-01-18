const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
