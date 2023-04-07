const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  res.send("Get all users");
};

const getSinglaUser = async (req, res) => {
  res.send("Get a user");
};

const showCurrentUser = async (req, res) => {
  res.send("Show current user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const updateUserPassword = async (req, res) => {
  res.send("Update user password");
};

module.exports = {
  getAllUsers,
  getSinglaUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
