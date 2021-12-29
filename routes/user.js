const Router = require("express");
const userRouter = new Router();
const controller = require("../controllers/user");

userRouter.post(`/login`, controller.login);

module.exports = userRouter;
