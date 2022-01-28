const Router = require("express");

const { departmentValidator, departmentValidatorPatch } = require("../validations/department");
const { errorHandlerAsync } = require("../middlewares/errorHandlerAsync");
const DepartmentController = require("../controllers/department");

const departmentRouter = new Router();

departmentRouter.post(`/departments`, departmentValidator, errorHandlerAsync(DepartmentController.createNewDepartment));
departmentRouter.get(`/departments`, errorHandlerAsync(DepartmentController.getDepartments));
departmentRouter.get(`/departments/:id`, errorHandlerAsync(DepartmentController.getDepartmentByID));
departmentRouter.get(`/departments/:id/employees`, errorHandlerAsync(DepartmentController.getEmployeesByDepartmentID));
departmentRouter.patch(`/departments/:id`, departmentValidatorPatch, errorHandlerAsync(DepartmentController.updateDepartmentByID));
departmentRouter.delete(`/departments/:id`, errorHandlerAsync(DepartmentController.deleteDepartmentByID));

module.exports = departmentRouter;
