const UserService = require("../services/user");

class UserController {
  async login(request, response) {
    const { username, password } = request.body;
    const user = await UserService.login(username, password);
    response.cookie("refreshToken", user.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.json({ user });
  }
  async logout(request, response) {
    const { refreshToken } = request.cookies;
    const token = await UserService.logout(refreshToken);
    response.clearCookie("refreshToken");
    response.json({ token });
  }
  async refreshToken(request, response) {
    const { refreshToken } = request.cookies;
    const userData = await UserService.refreshToken(refreshToken);
    response.cookie("refreshToken", userData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.json({ userData });
  }
}

module.exports = new UserController();
