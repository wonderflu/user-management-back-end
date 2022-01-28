const Router = require("express");

const { VERSION } = require("../config");
const userRouter = require("./user");
const { authMiddleware } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
const departmentRouter = require("./department");
const employeeRouter = require("./employee");
const CustomHTTPError = require("../errors");

const router = new Router();

router.use(`/${VERSION}`, userRouter);
router.use(`/${VERSION}`, authMiddleware);
router.use(`/${VERSION}/*`, isAdmin);
router.use(`/${VERSION}`, departmentRouter);
router.use(`/${VERSION}`, employeeRouter);

router.all("*", (request, response, next) => {
  next(CustomHTTPError.NotFound());
});

module.exports = router;
