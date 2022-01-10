const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
const jwt = require("jsonwebtoken");
const { DATABASE_URL, JWT_SECRET_KEY } = require("./config");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("avatars"));
app.use(fileUpload({}));
app.use("/api", router);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use((request, response, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return response
        .status(403)
        .json({ message: "Forbidden: You do not have permission to access this resource" });
    }
    const decodedData = jwt.verify(token, JWT_SECRET_KEY);
    response.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return response
      .status(403)
      .json({ message: "Forbidden: You do not have permission to access this resource" });
  }
});

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
