const { PermissionsDeniedError } = require("../errors/index");

// To prevent situation when a user can access routes that belong to other user
const checkPermissions = (currentUser, currentUserId) => {
  console.log(currentUser);
  console.log(currentUserId);
  console.log(typeof currentUserId); //object
};

module.exports = checkPermissions;
