const Router = require("express");
const departmentRouter = new Router();
const controller = require("../controllers/department");

departmentRouter.get(`/departments`, controller.getDepartments);
departmentRouter.post(`/departments/new`, controller.postNewDepartment);
departmentRouter.get(`/departments/:id`, controller.getDepartmentByID);
departmentRouter.put(`/departments/:id/edit`, controller.updateDepartmentByID);
departmentRouter.delete(`/departments/:id/delete`, controller.deleteDepartmentByID);

module.exports = departmentRouter;
