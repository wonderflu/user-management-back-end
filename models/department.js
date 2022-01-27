const { Schema, model } = require("mongoose");

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
      immutable: true,
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      minlength: 5,
      maxlength: 250,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Department", DepartmentSchema);
