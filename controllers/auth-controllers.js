const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
  res.send("Register");
};

const login = async (req, res) => {
  res.send("Login");
};

const logout = async (req, res) => {
  res.send("Logout");
};

exports = { register, login, logout };
