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
      match: [
        /^[A-Z]{1}[a-z]*/i,
        "Department name should start from the capital letter, it can contain up to 50 symbols and cannot have numbers.",
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      minlength: 5,
      maxlength: 250,
      match: [
        /^[A-Z]{1,}[a-z0-9]*/i,
        "Department description should start from the capital letter and should contain up to 250 symbols.",
      ],
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
