const Router = require("express");
const employeeRouter = new Router();

const employeeValidator = require("../validations/employee");
const errorHandlerAsync = require("../middlewares/errorHandlerAsync");
const EmployeeController = require("../controllers/employee");

employeeRouter.post(`/employees`, employeeValidator, errorHandlerAsync(EmployeeController.createNewEmployee));
employeeRouter.get(`/employees/:id`, errorHandlerAsync(EmployeeController.getEmployeeByID));
employeeRouter.put(`/employees/:id`, employeeValidator, errorHandlerAsync(EmployeeController.updateEmployeeByID));
employeeRouter.delete(`/employees/:id`, errorHandlerAsync(EmployeeController.deleteEmployeeByID));

module.exports = employeeRouter;
