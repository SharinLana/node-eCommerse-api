const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  createOrder,
} = require("../controllers/order-controllers");

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, authorizeAdmin("admin"), getAllOrders)
  .post(authenticateUser, createOrder);
router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);
router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);


module.exports = router;
