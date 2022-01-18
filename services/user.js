const UserSchema = require("../models/user");
const UserDto = require("../dtos/user");
const TokenService = require("./token");
const ClientError = require("../errors");

const bcrypt = require("bcryptjs");

class UserService {
  async login(username, password) {
    const user = await UserSchema.findOne({ username });
    if (!user) {
      throw ClientError.BadRequest(`User with such ${username} is not found`, [
        { username: "Only one user can be with such username" },
      ]);
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw ClientError.BadRequest("The password is incorrect");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw ClientError.UnauthorizedError();
    }
    const userData = TokenService.decodeRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ClientError.UnauthorizedError();
    }
    const user = await UserSchema.findById(user.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { tokens, user: userDto };
  }
}
module.exports = new UserService();
