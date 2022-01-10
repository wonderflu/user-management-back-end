const DepartmentService = require("../services/department");
const EmployeeService = require("../services/employee");

class DepartmentController {
  async createNewDepartment(request, response) {
    try {
      const department = await DepartmentService.createNewDepartment(request.body, request.files.picture);
      return response.status(200).json({ department });
    } catch (e) {
      console.log(e.message);
      return response.status(500).json(e.message);
    }
  }
  async getDepartments(request, response) {
    try {
      const departments = await DepartmentService.getDepartments();
      return response.status(200).json({ departments });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async getDepartmentByID(request, response) {
    try {
      const departmentByID = await DepartmentService.getDepartmentByID(request.params.id);
      return response.status(200).json({ departmentByID });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async getEmployeesByDepartmentID(request, response) {
    try {
      const employees = await EmployeeService.getEmployeesByDepartmentID(request.params.id);
      return response.status(200).json({ employees });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async updateDepartmentByID(request, response) {
    try {
      const updatedDepartment = await DepartmentService.updateDepartmentByID(request.body);
      return response.status(200).json({ updatedDepartment });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async deleteDepartmentByID(request, response) {
    try {
      const departmentToDelete = await DepartmentService.deleteDepartmentByID(request.params.id);
      return response.status(200).json({ departmentToDelete });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
}

module.exports = new DepartmentController();
