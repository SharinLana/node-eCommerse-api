const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "The name must ba at least 2 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Incorrect email",
    },
    unique: [true, "This email is already in use. Please choose another one"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minLength: [6, "Password cannot be shorter that 6 characters!"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
