const Router = require("express");
const userRouter = new Router();
const UserController = require("../controllers/user");

const { userValidator } = require("../validations/user");
const errorHandlerAsync = require("../middlewares/errorHandlerAsync");

userRouter.post(`/login`, userValidator, errorHandlerAsync(UserController.login));
userRouter.post(`/logout`, errorHandlerAsync(UserController.logout));
userRouter.get(`/refresh-token`, errorHandlerAsync(UserController.refreshToken));

module.exports = userRouter;
