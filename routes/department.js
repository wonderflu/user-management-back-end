const Router = require("express");
const departmentRouter = new Router();

const { departmentValidator, departmentValidatorPatch } = require("../validations/department");
const errorHandlerAsync = require("../middlewares/errorHandlerAsync");
const DepartmentController = require("../controllers/department");

departmentRouter.post(`/departments`, departmentValidator, errorHandlerAsync(DepartmentController.createNewDepartment));
departmentRouter.get(`/departments`, errorHandlerAsync(DepartmentController.getDepartments));
departmentRouter.get(`/departments/:id`, errorHandlerAsync(DepartmentController.getDepartmentByID));
departmentRouter.get(`/departments/:id/employees`, errorHandlerAsync(DepartmentController.getEmployeesByDepartmentID));
departmentRouter.patch(
  `/departments/:id`,
  departmentValidatorPatch,
  errorHandlerAsync(DepartmentController.updateDepartmentByID)
);
departmentRouter.delete(`/departments/:id`, errorHandlerAsync(DepartmentController.deleteDepartmentByID));

module.exports = departmentRouter;
