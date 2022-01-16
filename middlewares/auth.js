const TokenService = require("../services/token");

const auth = (request, response, next) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Forbidden: You do not have permission to access this resource");
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("Forbidden: You do not have permission to access this resource");
    }
    const userData = TokenService.decodeAccessToken(accessToken);
    if (!userData) {
      throw new Error("Forbidden: You do not have permission to access this resource");
    }
    request.user = userData;
    next();
  } catch (e) {
    console.log(e);
    return response
      .status(403)
      .json({ message: "Forbidden: You do not have permission to access this resource" });
  }
};

module.exports = auth;
