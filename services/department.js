const DepartmentSchema = require("../models/department");
const EmployeeSchema = require("../models/employee");
const FileService = require("./file");
const CustomHTTPError = require("../errors");

const mongoose = require("mongoose");

class DepartmentService {
  async createNewDepartment(department, files) {
    const { name } = department;
    const departmentDuplicate = await DepartmentSchema.findOne({ name });
    if (departmentDuplicate) {
      throw CustomHTTPError.BadRequest(`Department with the specified name (${name}) already exists.`);
    }
    let createdDepartment;
    if (files) {
      const fileName = FileService.saveFile(files.picture);
      createdDepartment = await DepartmentSchema.create({ ...department, picture: fileName });
    } else {
      createdDepartment = await DepartmentSchema.create({ ...department });
    }
    return createdDepartment;
  }
  async getDepartments(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortBy = ["asc", "desc"].indexOf(query.sort) < 0 ? "asc" : query.sort;
    const search = query.q;
    const filter_query = search ? { name: new RegExp("^" + search, "i") } : {};
    const total = await DepartmentSchema.find({}).where(filter_query).count();
    const results = {
      currentPage: page,
      limit: limit,
      sortBy: sortBy,
      search: search,
      total: total,
    };
    const departments = await DepartmentSchema.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ name: sortBy })
      .where(filter_query);
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
