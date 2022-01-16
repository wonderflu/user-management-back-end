const Router = require("express");

const userRouter = require("./user");
const departmentRouter = require("./department");
const employeeRouter = require("./employee");
const { VERSION } = require("../config");
const authMiddleware = require("../middlewares/auth");

const router = new Router();

router.use(`/${VERSION}`, userRouter);
router.use(`/${VERSION}`, authMiddleware);
router.use(`/${VERSION}`, departmentRouter);
router.use(`/${VERSION}`, employeeRouter);

router.use("*", (request, response) => {
  return response
    .status(404)
    .json({ message: "Not Found: Whooops! Page with such url doesn't exist, try again!" });
});

module.exports = router;
