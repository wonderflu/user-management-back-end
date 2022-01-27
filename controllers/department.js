const DepartmentService = require("../services/department");
const EmployeeService = require("../services/employee");

class DepartmentController {
  async createNewDepartment(request, response, next) {
    const department = await DepartmentService.createNewDepartment(request.body, request.files.picture);
    response.json({ department });
  }
  async getDepartments(request, response, next) {
    const departments = await DepartmentService.getDepartments();
    response.json({ departments });
  }
  async getDepartmentByID(request, response, next) {
    const departmentByID = await DepartmentService.getDepartmentByID(request.params.id);
    response.json({ departmentByID });
  }
  async getEmployeesByDepartmentID(request, response, next) {
    const employees = await EmployeeService.getEmployeesByDepartmentID(request.params.id);
    response.json({ employees });
  }
  async updateDepartmentByID(request, response, next) {
    const updatedDepartment = await DepartmentService.updateDepartmentByID(request.body);
    response.json({ updatedDepartment });
  }
  async deleteDepartmentByID(request, response, next) {
    const departmentToDelete = await DepartmentService.deleteDepartmentByID(request.params.id);
    response.json({ departmentToDelete });
  }
}

module.exports = new DepartmentController();
