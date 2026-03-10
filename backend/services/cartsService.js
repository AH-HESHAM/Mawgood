const UserModel = require("../models/User");

async function addToCart(userId, itemId, quantity) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.cart.push({ itemId, quantity });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function removeFromCart(userId, itemId) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.cart = user.cart.filter((item) => !item.itemId.equals(itemId));
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateCart(userId, itemId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(userId, itemId);
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const item = user.cart.find((item) => item.itemId.equals(itemId));
    if (!item) {
      throw new Error("Item not found in cart");
    }
    item.quantity = quantity;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserCart(userId) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  updateCart,
  getUserCart,
};
