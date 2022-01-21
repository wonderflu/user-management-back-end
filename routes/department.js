const Router = require("express");
const departmentRouter = new Router();

const DepartmentController = require("../controllers/department");

departmentRouter.post(`/departments`, DepartmentController.createNewDepartment);
departmentRouter.get(`/departments`, DepartmentController.getDepartments);
departmentRouter.get(`/departments/:id`, DepartmentController.getDepartmentByID);
departmentRouter.get(`/departments/:id/employees`, DepartmentController.getEmployeesByDepartmentID);
departmentRouter.put(`/departments/:id`, DepartmentController.updateDepartmentByID);
departmentRouter.delete(`/departments/:id`, DepartmentController.deleteDepartmentByID);

module.exports = departmentRouter;
