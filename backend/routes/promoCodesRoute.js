const router = require("express").Router();
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const {
  addPromocode,
  validatePromocode,
  applyPromocode,
  removePromocode,
} = require("../services/promoCodesService");

router.post("/", adminAuthMiddleware, async (req, res) => {
  try {
    const { code, discountPercentage, maxAmount, expiryDate } = req.body;
    await addPromocode(code, discountPercentage, maxAmount, expiryDate);
    res.json({ message: "Promocode added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/validate", async (req, res) => {
  try {
    const code = req.query.code;
    const promocode = await validatePromocode(code);
    res.json({ message: "Promocode validated successfully", promocode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/apply", async (req, res) => {
  try {
    const { code, userId } = req.body;
    await applyPromocode(code, userId);
    res.json({ message: "Promocode applied successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/", adminAuthMiddleware, async (req, res) => {
  try {
    const { code } = req.body;
    await removePromocode(code);
    res.json({ message: "Promocode removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
