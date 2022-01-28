const mongoose = require("mongoose");

const DepartmentSchema = require("../models/department");
const EmployeeSchema = require("../models/employee");
const FileService = require("./file");
const CustomHTTPError = require("../errors");

class DepartmentService {
  async createNewDepartment(department, files) {
    const { name } = department;
    const departmentDuplicate = await DepartmentSchema.findOne({ name });
    if (departmentDuplicate) {
      throw CustomHTTPError.BadRequest(`Department with the specified name (${name}) already exists.`);
    }
    const picture = files ? FileService.saveFile(files.picture) : undefined;
    const createdDepartment = await DepartmentSchema.create({ ...department, picture });
    return createdDepartment;
  }
  async getDepartments(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortBy = ["asc", "desc"].indexOf(query.sort) < 0 ? "asc" : query.sort;
    const search = query.q && query.q.replace(/[^a-zA-Z0-9 ]/g, "");
    const filterQuery = search ? { name: new RegExp("^" + search, "i") } : {};
    const total = await DepartmentSchema.find({}).where(filterQuery).count();
    const results = {
      currentPage: page,
      limit,
      sortBy,
      search,
      total,
    };
    const departments = await DepartmentSchema.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ name: sortBy })
      .where(filterQuery);
    return {
      results,
      departments,
    };
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
  async updateDepartmentByID(id, description) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("Invalid ID");
    }
    const updatedDescription = await DepartmentSchema.findByIdAndUpdate(id, { description }, { new: true });
    return updatedDescription;
  }
  async deleteDepartmentByID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw CustomHTTPError.BadRequest("Invalid ID");
    }
    const employeesInDepartment = await EmployeeSchema.find({ department: id }).count();
    if (!employeesInDepartment) {
      const departmentToDelete = await DepartmentSchema.findByIdAndDelete(id);
      return departmentToDelete;
    } else {
      throw CustomHTTPError.BadRequest("Cannot delete department with employees.");
    }
  }
}

module.exports = new DepartmentService();
