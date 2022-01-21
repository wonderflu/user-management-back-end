const DepartmentService = require("../services/department");
const EmployeeService = require("../services/employee");

class DepartmentController {
  async createNewDepartment(request, response, next) {
    try {
      const department = await DepartmentService.createNewDepartment(request.body, request.files.picture);
      return response.status(200).json({ department });
    } catch (error) {
      next(error);
    }
  }
  async getDepartments(request, response, next) {
    try {
      const departments = await DepartmentService.getDepartments();
      return response.status(200).json({ departments });
    } catch (error) {
      next(error);
    }
  }
  async getDepartmentByID(request, response, next) {
    try {
      const departmentByID = await DepartmentService.getDepartmentByID(request.params.id);
      return response.status(200).json({ departmentByID });
    } catch (error) {
      next(error);
    }
  }
  async getEmployeesByDepartmentID(request, response, next) {
    try {
      const employees = await EmployeeService.getEmployeesByDepartmentID(request.params.id);
      return response.status(200).json({ employees });
    } catch (error) {
      next(error);
    }
  }
  async updateDepartmentByID(request, response, next) {
    try {
      const updatedDepartment = await DepartmentService.updateDepartmentByID(request.body);
      return response.status(200).json({ updatedDepartment });
    } catch (error) {
      next(error);
    }
  }
  async deleteDepartmentByID(request, response, next) {
    try {
      const departmentToDelete = await DepartmentService.deleteDepartmentByID(request.params.id);
      return response.status(200).json({ departmentToDelete });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentController();
