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
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async logout(request, response) {
    try {
      const { refreshToken } = request.cookies;
      const token = await UserService.logout(refreshToken);
      response.clearCookie("refreshToken");
      return response.status(200).json({ token });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
  async refreshToken(request, response) {
    try {
      const { refreshToken } = request.cookies;
      const userData = await UserService.refreshToken(refreshToken);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.status(200).json({ userData });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
}

module.exports = new UserController();
