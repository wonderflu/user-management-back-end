const CustomHTTPError = require("../errors");

module.exports.errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error instanceof CustomHTTPError) {
    return response.status(error.status).json({ message: error.message });
  }
  return response.status(500).json({ message: error.message });
};
