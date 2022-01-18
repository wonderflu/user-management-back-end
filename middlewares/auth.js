const TokenService = require("../services/token");
const ClientError = require("../errors");

const auth = (request, response, next) => {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader) {
    throw ClientError.UnauthorizedError();
  }
  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    throw ClientError.UnauthorizedError();
  }
  const userData = TokenService.decodeAccessToken(accessToken);
  if (!userData) {
    throw ClientError.UnauthorizedError();
  }
  request.user = userData;
  next();
};

module.exports = auth;
