const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const { propfind } = require("../routes/product-routes");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId; // defining the "user" property as required the Product model
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new NotFoundError(
      `Product with the id ${req.params.id} does not exist in the DB`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  res.send("Update product");
};

const deleteProduct = async (req, res) => {
  res.send("Delete product");
};

const uploadImage = async (req, res) => {
  res.send("Upload image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
