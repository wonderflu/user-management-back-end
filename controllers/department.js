const Department = require("../models/department");

class departmentController {
  async getDepartments(request, response) {
    try {
      const departments = await Department.find();
      return response.status(200).json({ departments });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async postNewDepartment(request, response) {
    try {
    } catch (e) {}
  }
  async getDepartmentByID(request, response) {
    try {
    } catch (e) {}
  }
  async updateDepartmentByID(request, response) {
    try {
    } catch (e) {}
  }
  async deleteDepartmentByID(request, response) {
    try {
    } catch (e) {}
  }
}

module.exports = new departmentController();
