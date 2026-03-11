const User = require("../models/User");

async function checkUserRole(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.role;
}

module.exports = { checkUserRole };
