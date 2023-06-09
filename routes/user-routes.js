const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/user-controllers");

const router = express.Router();

router.route("/").get(authenticateUser, authorizeAdmin("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").post(authenticateUser, updateUser);
router.route("/updateUserPassword").post(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
