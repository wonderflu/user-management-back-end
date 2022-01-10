const Router = require("express");
const userRouter = require("./user");
const departmentRouter = require("./department");
const employeeRouter = require("./employee");

const router = new Router();
const VERSION = "v1";

router.use(`/${VERSION}`, departmentRouter);
router.use(`/${VERSION}`, employeeRouter);
router.use(`/${VERSION}`, userRouter);

router.get("*", (request, response) => {
  return response
    .status(404)
    .json({ message: "Not Found: Whooops! Page with such url doesn't exist, try again!" });
});

module.exports = router;
