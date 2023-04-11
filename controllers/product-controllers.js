const { StatusCodes } = require("http-status-codes");
const path = require("path");
const Product = require("../models/Product");
const { BadRequestError, NotFoundError } = require("../errors/index");

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
  const product = await Product.findOne({ _id: req.params.id }).populate(
    "review" // to see all the reviews of this product in the response
  );
  if (!product) {
    throw new NotFoundError(
      `Product with the id ${req.params.id} does not exist in the DB`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateProduct) {
    throw new NotFoundError(
      `Product with the id ${req.params.id} not found in the DB`
    );
  }
  res.status(StatusCodes.OK).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id });
  if (!product) {
    throw new NotFoundError(
      `Product with the id ${req.params.id} does not exist`
    );
  }

  res.status(StatusCodes.OK).json({
    message: `The product with the id ${req.params.id} has been deleted!`,
  });
};

const uploadImage = async (req, res) => {
  // console.log(req.files);

  if (!req.files) {
    throw new BadRequestError("No file uploaded!");
  }

  // if the type of uploaded fie is not the image
  if (!req.files.image.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image!");
  }

  const maxSize = 1024 * 1024;

  if (req.files.image.size > maxSize) {
    throw new BadRequestError("Please upload image smaller that 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${req.files.image.name}`
  );

  await req.files.image.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${req.files.image.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
