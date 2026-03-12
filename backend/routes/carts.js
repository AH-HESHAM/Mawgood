const express = require("express");
const cartService = require("../services/cartsService");
const router = express.Router();

// get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await cartService.getUserCart(req.params.userId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// add to cart
router.post("/:userId", async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.params.userId;
  try {
    const user = await cartService.addToCart(userId, itemId, quantity);
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update cart
router.put("/:userId", async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.params.userId;
  try {
    const user = await cartService.updateCart(userId, itemId, quantity);
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete from cart
router.delete("/:userId", async (req, res) => {
  const { itemId } = req.body;
  const userId = req.params.userId;
  try {
    const user = await cartService.removeFromCart(userId, itemId);
    res.json(user.cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
