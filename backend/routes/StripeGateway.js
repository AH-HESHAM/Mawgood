const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const dotenv = require("dotenv");
const cartsService = require("../services/cartsService");

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.line_items,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: "http://localhost:4200/payment-success",
      cancel_url: "http://localhost:4200/payment-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
});

router.post("/create-cash-payment", async (req, res) => {
  try {
    if (req.user?.id) {
      await cartsService.clearCart(req.user.id);
    }
    res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
