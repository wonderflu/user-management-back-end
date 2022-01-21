const UserSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const { SALT } = require("../config");

class seedUsers {
  async createAdmin() {
    try {
      const role = "ADMIN";
      const username = "Admin";
      const hashPassword = await bcrypt.hash("danger", SALT);
      const userData = { role: role, username: username, password: hashPassword };
      await UserSchema.create({ ...userData });
      return userData;
    } catch (error) {
      console.error(error);
    }
  }
  async createUser() {
    try {
      const role = "USER";
      const username = "User";
      const hashPassword = await bcrypt.hash("danger", SALT);
      const userData = { role: role, username: username, password: hashPassword };
      await UserSchema.create({ ...userData });
      return userData;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new seedUsers();
