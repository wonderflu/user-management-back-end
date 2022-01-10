const UserSchema = require("../models/user");

class UserService {
  async login(request, response) {
    try {
      const { username, password } = request.body;
      const user = await UserSchema.findOne({ username });
      if (!user) {
        return response.status(400).json({ message: `Bad request: User with such ${username} is not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return response.status(400).json({ message: "Bad request: The password is incorrect" });
      }
      const token = generateAccessToken(user._id, user.role);
      return response.json({ token });
    } catch (e) {
      console.log(e);
      return response.status(500).json({ message: "Internal Server Error: Could not fulfil your request." });
    }
  }
}
module.exports = new UserService();
