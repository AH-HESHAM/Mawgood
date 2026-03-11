const mongoose = require("mongoose");

// /home/karim/Mawgood/backend/models/User.js

const cartItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId, // Or mongoose.Schema.Types.ObjectId if referencing products
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
); // _id: false prevents Mongoose from creating an ID for every cart item

const usedPromoCodesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    usedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "seller", "customer"],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cart: [cartItemSchema],
  usedPromoCodes: [usedPromoCodesSchema],
});

module.exports = mongoose.model("User", userSchema);
