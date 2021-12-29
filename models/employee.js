const { Schema, model } = require("mongoose");

const Employee = new Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

module.exports = model("Employee", Employee);
