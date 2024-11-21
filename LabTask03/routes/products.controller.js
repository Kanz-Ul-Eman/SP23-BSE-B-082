const express = require("express");
let router = express.Router();
let Product = require("../models/product.model");

router.get("/admin/products", async (req, res) => {
  let products = await Product.find();
  return res.render("admin/products", {
    layout: "adminlayout",
    pageTitle: "Manage Home Furniture",
    products,
  });
});

module.exports = router;
