const { Schema, model } = require("mongoose");

const User = new Schema({
  role: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

module.exports = model("User", User);
