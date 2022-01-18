const UserService = require("../services/user");

class UserController {
  async login(request, response, next) {
    try {
      const { username, password } = request.body;
      const user = await UserService.login(username, password);
      response.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }
  async logout(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const token = await UserService.logout(refreshToken);
      response.clearCookie("refreshToken");
      return response.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  }
  async refreshToken(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const userData = await UserService.refreshToken(refreshToken);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.status(200).json({ userData });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
