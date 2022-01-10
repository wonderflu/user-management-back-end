const Router = require("express");
const userRouter = new Router();
const UserController = require("../controllers/user");

userRouter.post(`/login`, UserController.login);

module.exports = userRouter;
