const authorizeAdmin = (req, res, next) => {
  console.log("admin route");
  next();
};

module.exports = authorizeAdmin;
