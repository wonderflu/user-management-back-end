const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");
const { DATABASE_URL } = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use((request, response, next) => {
  if (request.headers.authorization) {
    const token = request.headers.authorization;
    request.is_authorized_user = token === TOKEN;
  }
  next();
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
