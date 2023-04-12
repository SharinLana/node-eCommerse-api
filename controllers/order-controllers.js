const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllOrders = async (req, res) => {
  res.send("Get all orders");
};

const getSingleOrder = async (req, res) => {
  res.send("Get Single order");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("Get current user orders");
};

const createOrder = async (req, res) => {
  res.send("Create order");
};

const updateOrder = async (req, res) => {
  res.send("Update order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createOrder,
};
