const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
});

let ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
