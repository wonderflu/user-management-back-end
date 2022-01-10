const DepartmentSchema = require("../models/department");
const FileService = require("./file");

class DepartmentService {
  async createNewDepartment(department, picture) {
    const fileName = FileService.saveFile(picture);
    const { name } = department;
    const departmentDuplicate = await DepartmentSchema.findOne({ name });
    if (departmentDuplicate) {
      throw new Error(`Bad request: Department with such name already exists.`);
    }
    const createdDepartment = await DepartmentSchema.create({ ...department, picture: fileName });
    return createdDepartment;
  }
  async getDepartments() {
    const departments = await DepartmentSchema.find();
    return departments;
  }
  async getDepartmentByID(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const departmentByID = await DepartmentSchema.findById(id);
    return departmentByID;
  }
  async updateDepartmentByID(department) {
    if (!department._id) {
      throw new Error("ID is required");
    }
    const updatedDepartment = await DepartmentSchema.findByIdAndUpdate(department._id, department, {
      new: true,
    });
    return updatedDepartment;
  }
  async deleteDepartmentByID(id) {
    if (!id) {
      throw new Error("ID is required");
    }
    const departmentToDelete = await DepartmentSchema.findByIdAndDelete(id);
    return departmentToDelete;
  }
}

module.exports = new DepartmentService();
