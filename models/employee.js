const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      minlength: 3,
      maxlength: 15,
      // match: [
      //   /^[A-Z]{1,}[a-z0-9_]+$/i,
      //   "Username should start from the capital letter and should contain up to 15 symbols",
      // ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 30,
      // match: [/[a-z0-9_]*@[A-Za-z0-9_]+\.[a-z]{2,}/i, "Email should contain number, letters and underscore."],
    },
    first_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
      // match: [
      //   /^[A-Z]{1,}[a-z]*/i,
      //   "First Name should start from the capital letter and should contain up to 20 symbols, it cannot have numbers.",
      // ],
    },
    last_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
      // match: [
      //   /^[A-Z]{1,}[a-z]*/i,
      //   "Last Name should start from the capital letter and should contain up to 20 symbols, it cannot have numbers.",
      // ],
    },
    picture: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Employee", EmployeeSchema);
