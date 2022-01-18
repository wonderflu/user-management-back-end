require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const router = require("./routes");
const { PORT, DATABASE_URL } = require("./config");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
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
app.use("/api", router);
app.use(errorMiddleware);

async function start() {
  try {
    await mongoose.connect(DATABASE_URL);
    app.listen(PORT, () => {
      console.log(`Server has been started on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
