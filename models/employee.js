const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      immutable: true,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      minlength: 5,
      maxlength: 30,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required."],
      minlength: 1,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
      minlength: 1,
      maxlength: 20,
    },
    picture: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Employee", EmployeeSchema);
