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

router
  .route("/")
  .get(getAllProducts)
  .post(authenticateUser, authorizeAdmin("admin"), createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticateUser, authorizeAdmin("admin"), updateProduct)
  .delete(authenticateUser, authorizeAdmin("admin"), deleteProduct);
router
  .route("/uploadImage")
  .post(authenticateUser, authorizeAdmin("admin"), uploadImage);

module.exports = router;
