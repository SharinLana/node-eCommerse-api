const { PermissionDeniedError } = require("../errors/index");

// To prevent situation when a user can access routes that belong to other user
const checkPermissions = (currentUser, currentUserId) => {
  //   console.log(currentUser); // { name: 'Helena', userId: '642f5864e73bdfeb51ba29eb', role: 'user'
  //   console.log(currentUserId); // new ObjectId("642f5ddf2015fe0959c9c2f3")
  //   console.log(typeof currentUserId); //object

  if (currentUser.role === "admin") return;
  if (currentUser.userId === currentUserId.toString()) return;
  throw new PermissionDeniedError(
    "You don't have permissions for such action!"
  );
};

module.exports = checkPermissions;
