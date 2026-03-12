const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   price: Number,
//   images: String,
//   category: String,
//   description: String,
//   stock: Number,
// });

// module.exports = mongoose.model("Product", productSchema);

const FlexibleSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model("Product", FlexibleSchema, "products");
