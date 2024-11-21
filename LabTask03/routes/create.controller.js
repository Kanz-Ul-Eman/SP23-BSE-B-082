const express = require("express");
let router = express.Router();
let Product = require("../models/product.model");

router.get("/admin/products/delete/:id", async (req, res) => {
  // let params = req.params;
  await Product.findByIdAndDelete(req.params.id);
  // let query = req.query;
  // return res.send({ query, params });
  // return res.send(product);
  return res.redirect("/admin/products");
});

router.get("/admin/products/editForm/:id", async (req, res) => {
  // let params = req.params;
  let product = await Product.findById(req.params.id);
  return res.render("admin/editForm", { layout: "adminlayout", product });
});

router.post("/admin/products/editForm/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.title = req.body.title;
  product.description = req.body.description;
  product.price = req.body.price;
  await product.save();
  return res.redirect("/admin/products");
});

router.post("/admin/createForm", async (req, res) => {
  let data = req.body;
  let newProduct = new Product(data);
  newProduct.title = data.title;
  await newProduct.save();
  return res.redirect("/admin/products");
});

router.get("/admin/createForm", (req, res) => {
  return res.render("admin/createForm", {
    layout: "adminlayout",
  });
});
module.exports = router;
