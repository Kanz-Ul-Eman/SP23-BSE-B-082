const express = require("express");
let router = express.Router();

router.get("/admin/products", (req, res) => {
  let products = [
    {
      title: "Modern Sofa",
      price: "499",
      description: "A sleek and comfortable sofa with a contemporary design.",
      _id: 1,
    },
    {
      title: "Dining Table Set",
      price: "799",
      description: "A spacious wooden dining table with six matching chairs.",
      _id: 2,
    },
    {
      title: "Queen Bed Frame",
      price: "599",
      description: "A sturdy queen-size bed frame made of high-quality.",
      _id: 3,
    },
    {
      title: "Bookshelf",
      price: "199",
      description:
        "A tall, multipurpose bookshelf with five adjustable shelves.",
      _id: 4,
    },
  ];
  return res.render("admin/products", {
    layout: "adminlayout",
    pageTitle: "Manage Home Furniture",
    products,
  });
});

module.exports = router;
