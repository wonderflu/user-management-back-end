const EmployeeSchema = require("../models/employee");
const DepartmentSchema = require("../models/department");
const FileService = require("./file");
const CustomHTTPError = require("../errors");

const mongoose = require("mongoose");

class EmployeeService {
  async createNewEmployee(employee, picture) {
    const fileName = FileService.saveFile(picture);
    const { username, email, department } = employee;
    const usernameDuplicate = await EmployeeSchema.findOne({ username });
    if (usernameDuplicate) {
      throw CustomHTTPError.BadRequest(`User with such ${username} already exists.`, [
        { username: "This field should be unique" },
      ]);
    }
    const emailDuplicate = await EmployeeSchema.findOne({ email });
    if (emailDuplicate) {
      throw CustomHTTPError.BadRequest(`User with such ${email} already exists.`, [
        { email: "This field should be unique" },
      ]);
    }
    const checkDepartmentExistence = await DepartmentSchema.findById(department);
    if (!checkDepartmentExistence) {
      throw CustomHTTPError.BadRequest("Department with such ID does not exist.", [
        { department: "Department should exist" },
      ]);
    }
    const createdEmployee = await EmployeeSchema.create({ ...employee, picture: fileName });
    return createdEmployee;
  }
  async getEmployeesByDepartmentID(departmentID) {
    if (!mongoose.Types.ObjectId.isValid(departmentID)) {
      throw CustomHTTPError.BadRequest("Department ID is invalid");
    }
    const employeesByDepartmentID = await EmployeeSchema.find({ department: departmentID });
    return employeesByDepartmentID;
  }
  async getEmployeeByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("ID is invalid");
    }
    const employeeById = await EmployeeSchema.findById(id);
    if (!employeeById) {
      throw CustomHTTPError.BadRequest("Employee with such ID does not exist.");
    }
    return employeeById;
  }
  async updateEmployeeByID(employee) {
    if (!mongoose.Types.ObjectId.isValid(employee._id)) {
      throw CustomHTTPError.BadRequest("ID is invalid");
    }
    const updatedEmployee = await EmployeeSchema.findByIdAndUpdate(employee._id, employee, {
      new: true,
    });
    return updatedEmployee;
  }
  async deleteEmployeeByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("ID is invalid");
    }
    const employeeToDelete = await EmployeeSchema.findByIdAndDelete(id);
    return employeeToDelete;
  }
}

module.exports = new EmployeeService();
