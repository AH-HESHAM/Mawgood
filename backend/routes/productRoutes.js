const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// !!!!!!!!!!!!!!!! not tested yet !!!!!!!!!!!!!!!!!!
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create product. Check your data." });
  }
});

module.exports = router;