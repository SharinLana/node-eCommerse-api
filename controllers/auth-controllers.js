const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const { attachCookiesToResponse } = require("../utils/jwt");

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

  attachCookiesToResponse({ res, tokenPayload });

  res.status(StatusCodes.CREATED).json({
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide the email and password!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("No user found with this email");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect password!");
  }

  const tokenPayload = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, tokenPayload });

  res.status(StatusCodes.OK).json({
    user,
  });
};

const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = { register, login, logout };
