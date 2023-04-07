const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/user-controllers");

const router = express.Router();

router.route("/").get(getAllUsers);

module.exports = router;
