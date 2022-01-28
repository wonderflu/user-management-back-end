const jwt = require("jsonwebtoken");

const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../config");
const TokenSchema = require("../models/token");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: "24h" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    const tokenToRefresh = await TokenSchema.findOne({ user: userId });
    if (tokenToRefresh) {
      tokenToRefresh.refreshToken = refreshToken;
      return tokenToRefresh.save();
    }
    const token = await TokenSchema.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenToDelete = await TokenSchema.deleteOne({ refreshToken });
    return tokenToDelete;
  }
  async findToken(refreshToken) {
    const tokenToFind = await TokenSchema.findOne({ refreshToken });
    return tokenToFind;
  }
  decodeAccessToken(token) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }
  decodeRefreshToken(token) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
