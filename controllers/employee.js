const Employee = require("../models/employee");

class employeeController {
  async getEmployees(request, response) {
    try {
      const employees = await Employee.find();
      return response.status(200).json({ employees });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async postNewEmployee(request, response) {
    try {
    } catch (e) {}
  }
  async getEmployeeByID(request, response) {
    try {
    } catch (e) {}
  }
  async updateEmployeeByID(request, response) {
    try {
    } catch (e) {}
  }
  async deleteEmployeeByID(request, response) {
    try {
    } catch (e) {}
  }
}

module.exports = new employeeController();
