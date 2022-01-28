require("dotenv").config();
const express = require("express");

const { routesInitializer } = require("./initialization/routes");
const { databaseInitializer } = require("./initialization/database");
const { PORT } = require("./config");

const app = express();

async function start() {
  try {
    await databaseInitializer();
    routesInitializer(app);
    app.listen(PORT, () => {
      console.log(`Server has been started on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
start();
