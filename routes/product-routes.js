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

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);
router.route("/uploadImage").post(uploadImage);


module.exports = router;
