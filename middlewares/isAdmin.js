const CustomHTTPError = require("../errors");

module.exports.isAdmin = (request, response, next) => {
  if (["POST", "PATCH", "PUT", "DELETE"].indexOf(request.method) > -1) {
    if (request.user.role != "ADMIN") {
      throw CustomHTTPError.Forbidden();
    }
  }
  next();
};
