const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors/index");
const { createJWT, isTokenValid } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide the name, email and password!");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError(
      "This email is already in use. Please choose another one"
    );
  }
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, name, password, role }); // to secure the role (by preventing the user to register as admin)
  const tokenPayload = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenPayload });

  res.status(StatusCodes.CREATED).json({
    token,
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
