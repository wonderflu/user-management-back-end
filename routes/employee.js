const Router = require("express");
const employeeRouter = new Router();
const EmployeeController = require("../controllers/employee");

employeeRouter.post(`/employees`, EmployeeController.createNewEmployee);
employeeRouter.get(`/employees/:id`, EmployeeController.getEmployeeByID);
employeeRouter.patch(`/employees/:id`, EmployeeController.updateEmployeeByID);
employeeRouter.delete(`/employees/:id`, EmployeeController.deleteEmployeeByID);

module.exports = employeeRouter;
