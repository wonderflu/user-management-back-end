const Router = require("express");

const { employeeValidator, employeeValidatorPatch } = require("../validations/employee");
const { errorHandlerAsync } = require("../middlewares/errorHandlerAsync");
const EmployeeController = require("../controllers/employee");

const employeeRouter = new Router();

employeeRouter.post(`/employees`, employeeValidator, errorHandlerAsync(EmployeeController.createNewEmployee));
employeeRouter.get(`/employees/:id`, errorHandlerAsync(EmployeeController.getEmployeeByID));
employeeRouter.patch(`/employees/:id`, employeeValidatorPatch, errorHandlerAsync(EmployeeController.updateEmployeeByID));
employeeRouter.delete(`/employees/:id`, errorHandlerAsync(EmployeeController.deleteEmployeeByID));

module.exports = employeeRouter;
