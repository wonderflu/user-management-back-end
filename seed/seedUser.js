const UserSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const { SALT } = require("../config");

class SeedUsers {
  async createAdmin() {
    try {
      const role = "ADMIN";
      const username = "Admin";
      const password = "danger";
      const hashPassword = await bcrypt.hash(password, SALT);
      const userData = { role: role, username: username, password: hashPassword };
      await UserSchema.create({ ...userData });
      userData.password = password;
      return userData;
    } catch (error) {
      console.error(error);
    }
  }
  async createUser() {
    try {
      const role = "USER";
      const username = "User";
      const password = "danger";
      const hashPassword = await bcrypt.hash(password, SALT);
      const userData = { role: role, username: username, password: hashPassword };
      await UserSchema.create({ ...userData });
      userData.password = password;
      return userData;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new SeedUsers();
