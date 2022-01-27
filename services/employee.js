const EmployeeSchema = require("../models/employee");
const DepartmentSchema = require("../models/department");
const FileService = require("./file");
const CustomHTTPError = require("../errors");

const mongoose = require("mongoose");

class EmployeeService {
  async createNewEmployee(employee, files) {
    const { username, email, department } = employee;
    const usernameDuplicate = await EmployeeSchema.findOne({ username });
    if (usernameDuplicate) {
      throw CustomHTTPError.BadRequest(`Employee with the specified username (${username}) already exists.`);
    }
    const emailDuplicate = await EmployeeSchema.findOne({ email });
    if (emailDuplicate) {
      throw CustomHTTPError.BadRequest(`Employee with the specified email (${email}) already exists.`);
    }
    const checkDepartmentExistence = await DepartmentSchema.findById(department);
    if (!checkDepartmentExistence) {
      throw CustomHTTPError.BadRequest("Department with such ID does not exist.");
    }
    let createdEmployee;
    if (files) {
      const fileName = FileService.saveFile(files.picture);
      createdEmployee = await EmployeeSchema.create({ ...employee, picture: fileName });
    } else {
      createdEmployee = await EmployeeSchema.create({ ...employee });
    }
    return createdEmployee;
  }
  async getEmployeesByDepartmentID(departmentID) {
    if (!mongoose.Types.ObjectId.isValid(departmentID)) {
      throw CustomHTTPError.BadRequest("Invalid Department ID");
    }
    const employeesByDepartmentID = await EmployeeSchema.find({ department: departmentID });
    return employeesByDepartmentID;
  }
  async getEmployeeByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("Invalid ID");
    }
    const employeeById = await EmployeeSchema.findById(id);
    if (!employeeById) {
      throw CustomHTTPError.BadRequest("Employee with such ID does not exist.");
    }
    return employeeById;
  }
  async updateEmployeeByID(id, employee) {
    const { email, first_name, last_name } = employee;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("Invalid ID");
    }
    let updatedEmployeeData = {};
    if (email) {
      updatedEmployeeData.email = email;
    }
    if (first_name) {
      updatedEmployeeData.first_name = first_name;
    }
    if (last_name) {
      updatedEmployeeData.last_name = last_name;
    }
    const updatedEmployee = await EmployeeSchema.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
    return updatedEmployee;
  }
  async deleteEmployeeByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("Invalid ID");
    }
    const employeeToDelete = await EmployeeSchema.findByIdAndDelete(id);
    return employeeToDelete;
  }
}

module.exports = new EmployeeService();
