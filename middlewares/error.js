const ClientError = require("../errors");

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error instanceof ClientError) {
    return response.status(error.status).json({ message: error.message, errors: error.errors });
  }
  return response.status(500).json({ message: "The server could not fulfill the request." });
};

module.exports = errorHandler;
