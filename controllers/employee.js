const EmployeeService = require("../services/employee");

class EmployeeController {
  async createNewEmployee(request, response, next) {
    try {
      const employee = await EmployeeService.createNewEmployee(request.body, request.files.picture);
      return response.status(200).json({ employee });
    } catch (e) {
      next(e);
    }
  }
  async getEmployeeByID(request, response, next) {
    try {
      const employeeByID = await EmployeeService.getEmployeeByID(request.params.id);
      return response.status(200).json({ employeeByID });
    } catch (e) {
      next(e);
    }
  }
  async updateEmployeeByID(request, response, next) {
    try {
      const updatedEmployee = await EmployeeService.updateDepartmentByID(request.body);
      return response.status(200).json({ updatedEmployee });
    } catch (e) {
      next(e);
    }
  }
  async deleteEmployeeByID(request, response, next) {
    try {
      const employeeToDelete = await EmployeeService.deleteEmployeeByID(request.params.id);
      return response.status(200).json({ employeeToDelete });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EmployeeController();
