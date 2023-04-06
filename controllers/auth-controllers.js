const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors/index");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide the name, email and password!");
  }

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    user,
  });
};

const login = async (req, res) => {
  res.send("Login");
};

const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = { register, login, logout };
