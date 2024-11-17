const express = require("express");
let router = express.Router();

router.get("/admin/createForm", (req, res) => {
  return res.render("admin/createForm", {
    layout: "adminlayout",
    pageTitle: "Manage Home Furniture",
  });
});
module.exports = router;
