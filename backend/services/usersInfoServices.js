const User = require("../models/User");

async function checkUserRole(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.role;
}

async function getUserInfo(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    recipientName: user.fullName,
    phoneNumber: user.phoneNumber,
    address: user.address,
    paymentMethod: user.paymentMethod,
  };
}

module.exports = { checkUserRole, getUserInfo };
