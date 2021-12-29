const Router = require("express");
const employeeRouter = new Router();
const controller = require("../controllers/employee");

employeeRouter.get(`/employees`, controller.getEmployees);
employeeRouter.post(`/employees/new`, controller.postNewEmployee);
employeeRouter.get(`/employees/:id`, controller.getEmployeeByID);
employeeRouter.put(`/employees/:id/edit`, controller.updateEmployeeByID);
employeeRouter.delete(`/employees/:id/delete`, controller.deleteEmployeeByID);

module.exports = employeeRouter;
