const EmployeeService = require("../services/employee");

class EmployeeController {
  async createNewEmployee(request, response, next) {
    const employee = await EmployeeService.createNewEmployee(request.body, request.files);
    response.json({ employee });
  }
  async getEmployeeByID(request, response, next) {
    const employeeByID = await EmployeeService.getEmployeeByID(request.params.id);
    response.json({ employeeByID });
  }
  async updateEmployeeByID(request, response, next) {
    const updatedEmployee = await EmployeeService.updateEmployeeByID(request.params.id, request.body);
    response.json({ updatedEmployee });
  }
  async deleteEmployeeByID(request, response, next) {
    const employeeToDelete = await EmployeeService.deleteEmployeeByID(request.params.id);
    response.json({ employeeToDelete });
  }
}

module.exports = new EmployeeController();
