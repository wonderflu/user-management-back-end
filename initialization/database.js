const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config");
const checkUserExistence = require("../seed/checkUserExistence");

const databaseInitializer = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB.");
    await checkUserExistence();
  } catch (error) {
    console.error(error);
  }
};

module.exports = databaseInitializer;
