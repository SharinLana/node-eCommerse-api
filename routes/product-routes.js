const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/product-controllers");

const router = express.Router();



module.exports = router;
