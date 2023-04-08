const { PermissionDeniedError } = require("../errors/index");

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new PermissionDeniedError(
      "You don't have permission to access this route!"
    );
  }
  next();
};

module.exports = authorizeAdmin;
