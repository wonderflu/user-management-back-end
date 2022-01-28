const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required."],
      unique: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
