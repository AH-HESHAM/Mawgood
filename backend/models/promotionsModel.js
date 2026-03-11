const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  maxAmount: { type: Number },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model("Promotion", promotionSchema);
