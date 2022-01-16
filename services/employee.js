const EmployeeSchema = require("../models/employee");
const FileService = require("./file");

class EmployeeService {
  async createNewEmployee(employee, picture) {
    const fileName = FileService.saveFile(picture);
    const { username, email } = employee;
    const usernameDuplicate = await EmployeeSchema.findOne({ username });
    if (usernameDuplicate) {
      return response
        .status(400)
        .json({ message: `Bad request: User with such ${username} already exists.` });
    }
    const emailDuplicate = await EmployeeSchema.findOne({ email });
    if (emailDuplicate) {
      return response.status(400).json({ message: `Bad request: User with such ${email} already exists.` });
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
  async updateEmployeeByID(request, response) {
    try {
      const updatedEmployee = await EmployeeService.updateDepartmentByID(request.body);
      return response.status(200).json({ updatedEmployee });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
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
