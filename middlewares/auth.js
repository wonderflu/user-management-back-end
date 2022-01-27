const TokenService = require("../services/token");
const CustomHTTPError = require("../errors");

const auth = (request, response, next) => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    throw CustomHTTPError.UnauthorizedError();
  }
  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    throw CustomHTTPError.UnauthorizedError();
  }
  const userData = TokenService.decodeAccessToken(accessToken);
  if (!userData) {
    throw CustomHTTPError.UnauthorizedError();
  }
  request.user = userData;
  next();
};

module.exports = auth;
