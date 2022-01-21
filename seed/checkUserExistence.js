const seedUsers = require("./seedUser");
const UserSchema = require("../models/user");

const checkUserExistence = async () => {
  try {
    const adminCount = await UserSchema.find({ role: "ADMIN" }).count();
    if (!adminCount) {
      const createdAdmin = await seedUsers.createAdmin();
      console.log(`role: ${createdAdmin.role}`);
      console.log(`username: ${createdAdmin.username}`);
      console.log(`password: ${createdAdmin.password}`);
    }
    const userCount = await UserSchema.find({ role: "USER" }).count();
    if (!userCount) {
      const createdUser = await seedUsers.createUser();
      console.log(`role: ${createdUser.role}`);
      console.log(`username: ${createdUser.username}`);
      console.log(`password: ${createdUser.password}`);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkUserExistence;
