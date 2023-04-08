const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  //   console.log(req.user);
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
// Checking if the user exists to direct him to the restricted route
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user }); // more stuff can be added to the req.user object but don't include the password!
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide your old and new password!");
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new UnauthenticatedError(
      `No user found with the id: ${req.user.userId}`
    );
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("The old password is incorrect!");
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Success! Password updated!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
