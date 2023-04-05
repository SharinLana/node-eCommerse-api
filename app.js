const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const port = process.env.PORT || 5100;

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("MONGODB CONNECTED!"))
      .catch((err) => console.log(err));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
