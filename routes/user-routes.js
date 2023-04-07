const express = require("express");
const {
  getAllUsers,
  getSinglaUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/user-controllers");

const router = express.Router();

router.route("/").get(getAllUsers);

module.exports = router;
