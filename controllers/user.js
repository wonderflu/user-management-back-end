const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" });
};

class userController {
  async login(request, response) {
    try {
      const { username, password } = request.body;
      const user = await User.findOne({ username });
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

module.exports = new userController();
