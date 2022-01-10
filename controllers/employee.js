const EmployeeService = require("../services/employee");

class EmployeeController {
  async createNewEmployee(request, response) {
    try {
      const employee = await EmployeeService.createNewEmployee(request.body, request.files.picture);
      return response.status(200).json({ employee });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async getEmployeeByID(request, response) {
    try {
      const employeeByID = await EmployeeService.getEmployeeByID(request.params.id);
      return response.status(200).json({ employeeByID });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
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
  async deleteEmployeeByID(request, response) {
    try {
      const employeeToDelete = await EmployeeService.deleteEmployeeByID(request.params.id);
      return response.status(200).json({ employeeToDelete });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
}

module.exports = new EmployeeController();
