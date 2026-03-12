const Promotion = require("../models/promotionsModel");
const User = require("../models/User");
// add promocode to database
async function addPromocode(code, discountPercentage, maxAmount, expiryDate) {
  const newPromocode = new Promotion({
    code,
    discountPercentage,
    maxAmount,
    expiryDate,
  });
  await newPromocode.save();
}
// validate promocode
async function validatePromocode(code) {
  const promocode = await Promotion.findOne({ code });
  if (!promocode) {
    throw new Error("Invalid promocode");
  }
  if (new Date() > promocode.expiryDate) {
    throw new Error("Promocode expired");
  }
  return promocode;
}
// apply promocode
async function applyPromocode(code, userId) {
  const promocode = await validatePromocode(code);
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.usedPromoCodes.some((pCode) => pCode.code === code)) {
    throw new Error("Promocode already used");
  }
  user.usedPromoCodes.push({ code, usedAt: new Date() });
  await user.save();
}
// remove promocode from database
async function removePromocode(code) {
  await Promotion.deleteOne({ code });
}

module.exports = {
  addPromocode,
  validatePromocode,
  applyPromocode,
  removePromocode,
};
