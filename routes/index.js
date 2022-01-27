const Router = require("express");

const userRouter = require("./user");
const departmentRouter = require("./department");
const employeeRouter = require("./employee");
const { VERSION } = require("../config");
const authMiddleware = require("../middlewares/auth");
const adminRightsMiddleware = require("../middlewares/isAdmin");
const CustomHTTPError = require("../errors");

const router = new Router();

router.use(`/${VERSION}`, userRouter);
router.use(`/${VERSION}`, authMiddleware);
router.use(`/${VERSION}/*`, adminRightsMiddleware);
router.use(`/${VERSION}`, departmentRouter);
router.use(`/${VERSION}`, employeeRouter);

router.all("*", (request, response, next) => {
  next(CustomHTTPError.NotFound());
});

module.exports = router;
