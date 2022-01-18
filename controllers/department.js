const DepartmentService = require("../services/department");
const EmployeeService = require("../services/employee");

class DepartmentController {
  async createNewDepartment(request, response, next) {
    try {
      const department = await DepartmentService.createNewDepartment(request.body, request.files.picture);
      return response.status(200).json({ department });
    } catch (e) {
      next(e);
    }
  }
  async getDepartments(request, response, next) {
    try {
      const departments = await DepartmentService.getDepartments();
      return response.status(200).json({ departments });
    } catch (e) {
      next(e);
    }
  }
  async getDepartmentByID(request, response, next) {
    try {
      const departmentByID = await DepartmentService.getDepartmentByID(request.params.id);
      return response.status(200).json({ departmentByID });
    } catch (e) {
      next(e);
    }
  }
  async getEmployeesByDepartmentID(request, response, next) {
    try {
      const employees = await EmployeeService.getEmployeesByDepartmentID(request.params.id);
      return response.status(200).json({ employees });
    } catch (e) {
      next(e);
    }
  }
  async updateDepartmentByID(request, response, next) {
    try {
      const updatedDepartment = await DepartmentService.updateDepartmentByID(request.body);
      return response.status(200).json({ updatedDepartment });
    } catch (e) {
      next(e);
    }
  }
  async deleteDepartmentByID(request, response, next) {
    try {
      const departmentToDelete = await DepartmentService.deleteDepartmentByID(request.params.id);
      return response.status(200).json({ departmentToDelete });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DepartmentController();
