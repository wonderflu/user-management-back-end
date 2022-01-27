const DepartmentSchema = require("../models/department");
const EmployeeSchema = require("../models/employee");
const FileService = require("./file");
const CustomHTTPError = require("../errors");

const mongoose = require("mongoose");

class DepartmentService {
  async createNewDepartment(department, picture) {
    const fileName = FileService.saveFile(picture);
    const { name } = department;
    const departmentDuplicate = await DepartmentSchema.findOne({ name });
    if (departmentDuplicate) {
      throw CustomHTTPError.BadRequest("Department with such name already exists.", [
        { name: "this field should be unique" },
      ]);
    }
    const createdDepartment = await DepartmentSchema.create({ ...department, picture: fileName });
    return createdDepartment;
  }
  async getDepartments() {
    const departments = await DepartmentSchema.find();
    return departments;
  }
  async getDepartmentByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("ID is invalid");
    }
    const departmentByID = await DepartmentSchema.findById(id);
    if (!departmentByID) {
      throw CustomHTTPError.BadRequest("Department with such ID does not exist.");
    }
    return departmentByID;
  }
  async updateDepartmentByID(department) {
    if (!mongoose.Types.ObjectId.isValid(department._id)) {
      throw CustomHTTPError.BadRequest("ID is invalid");
    }
    const updatedDepartment = await DepartmentSchema.findByIdAndUpdate(department._id, department, {
      new: true,
    });
    return updatedDepartment;
  }
  async deleteDepartmentByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("ID is invalid");
    }
    const employeesInDepartment = await EmployeeSchema.find({ department: id }).count();
    if (!employeesInDepartment) {
      const departmentToDelete = await DepartmentSchema.findByIdAndDelete(id);
      return departmentToDelete;
    } else {
      throw CustomHTTPError.BadRequest("Cannot delete department with employees.", [
        { department: "Department should be empty before its deletation." },
      ]);
    }
  }
}

module.exports = new DepartmentService();
