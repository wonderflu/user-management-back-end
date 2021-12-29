const { Schema, model } = require("mongoose");

const Department = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

module.exports = model("Department", Department);
