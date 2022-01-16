const Router = require("express");
const userRouter = new Router();
const UserController = require("../controllers/user");

userRouter.post(`/login`, UserController.login);
userRouter.post(`/logout`, UserController.logout);
userRouter.get(`/refresh-token`, UserController.refreshToken);

module.exports = userRouter;
