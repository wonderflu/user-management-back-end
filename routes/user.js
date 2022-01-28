const Router = require("express");

const { userValidator } = require("../validations/user");
const { errorHandlerAsync } = require("../middlewares/errorHandlerAsync");
const UserController = require("../controllers/user");

const userRouter = new Router();

userRouter.post(`/login`, userValidator, errorHandlerAsync(UserController.login));
userRouter.post(`/logout`, errorHandlerAsync(UserController.logout));
userRouter.get(`/refresh-token`, errorHandlerAsync(UserController.refreshToken));

module.exports = userRouter;
