const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const router = require("../routes");
const errorMiddleware = require("../middlewares/errorHandler");

const routesInitializer = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static("avatars"));
  app.use(fileUpload({}));
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use("/api", router);
  app.use(errorMiddleware);
};

module.exports = routesInitializer;
