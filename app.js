require("express-async-errors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

const authRouter = require("./routes/auth-routes");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const port = process.env.PORT || 5100;

// Activate morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/v1", (req, res) => {
  // console.log(req.signedCookies)
  res.send("Hello!");
});

app.use("/api/v1/auth", authRouter);
app.use(errorHandler);
app.use(notFound);

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
