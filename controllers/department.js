const DepartmentService = require("../services/department");
const EmployeeService = require("../services/employee");

class DepartmentController {
  async createNewDepartment(request, response) {
    const department = await DepartmentService.createNewDepartment(request.body, request.files);
    response.json({ department });
  }
  async getDepartments(request, response) {
    const departments = await DepartmentService.getDepartments(request.query);
    response.json({ departments });
  }
  async getDepartmentByID(request, response) {
    const departmentByID = await DepartmentService.getDepartmentByID(request.params.id);
    response.json({ departmentByID });
  }
  async getEmployeesByDepartmentID(request, response) {
    const employees = await EmployeeService.getEmployeesByDepartmentID(request.params.id);
    response.json({ employees });
  }
  async updateDepartmentByID(request, response) {
    const updatedDescription = await DepartmentService.updateDepartmentByID(request.params.id, request.body.description);
    response.json({ updatedDescription });
  }
  async deleteDepartmentByID(request, response) {
    const departmentToDelete = await DepartmentService.deleteDepartmentByID(request.params.id);
    response.json({ departmentToDelete });
  }
}

module.exports = new DepartmentController();
