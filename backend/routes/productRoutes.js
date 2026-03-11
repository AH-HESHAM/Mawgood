const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Failed to delete product. Check your data." });
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
    res
      .status(400)
      .json({ error: "Failed to create product. Check your data." });
  }
});

module.exports = router;
