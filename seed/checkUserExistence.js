const UserSchema = require("../models/user");
const SeedUsers = require("./seedUser");

module.exports.checkUserExistence = async () => {
  try {
    const adminCount = await UserSchema.find({ role: "ADMIN" }).count();
    if (!adminCount) {
      const createdAdmin = await SeedUsers.createAdmin();
      console.log(`role: ${createdAdmin.role}`);
      console.log(`username: ${createdAdmin.username}`);
      console.log(`password: ${createdAdmin.password}`);
    }
    const userCount = await UserSchema.find({ role: "USER" }).count();
    if (!userCount) {
      const createdUser = await SeedUsers.createUser();
      console.log(`role: ${createdUser.role}`);
      console.log(`username: ${createdUser.username}`);
      console.log(`password: ${createdUser.password}`);
    }
  } catch (error) {
    console.error(error);
  }
};
