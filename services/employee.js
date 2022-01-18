const EmployeeSchema = require("../models/employee");
const FileService = require("./file");
const ClientError = require("../errors");

class EmployeeService {
  async createNewEmployee(employee, picture) {
    const fileName = FileService.saveFile(picture);
    const { username, email } = employee;
    const usernameDuplicate = await EmployeeSchema.findOne({ username });
    if (usernameDuplicate) {
      throw ClientError.BadRequest(`User with such ${username} already exists.`, [
        { username: "this field should be unique" },
      ]);
    }
    const emailDuplicate = await EmployeeSchema.findOne({ email });
    if (emailDuplicate) {
      throw ClientError.BadRequest(`User with such ${email} already exists.`, [
        { email: "this field should be unique" },
      ]);
    }
    const createdEmployee = await EmployeeSchema.create({ ...employee, picture: fileName });
    return createdEmployee;
  }
  async getEmployeesByDepartmentID(departmentID) {
    if (!departmentID) {
      throw new Error("Department ID is required");
    }
    const employeesByDepartmentID = await EmployeeSchema.find({ department: departmentID });
    return employeesByDepartmentID;
  }
  async getEmployeeByID(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const employeeById = await EmployeeSchema.findById(id);
    return employeeById;
  }
  async updateEmployeeByID(employee) {
    if (!employee._id) {
      throw new Error("ID is required");
    }
    const updatedEmployee = await EmployeeSchema.findByIdAndUpdate(employee._id, employee, {
      new: true,
    });
    return updatedEmployee;
  }
  async deleteEmployeeByID(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const employeeToDelete = await EmployeeSchema.findByIdAndDelete(id);
    return employeeToDelete;
  }
}

module.exports = new EmployeeService();
