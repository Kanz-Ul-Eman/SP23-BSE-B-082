const express = require("express");
let server = express();
var expressLayouts = require("express-ejs-layouts");
server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(expressLayouts);
let adminProductsRouter = require("./routes/products.controller");
server.use(adminProductsRouter);
let adminCreateRouter = require("./routes/create.controller");
server.use(adminCreateRouter);

server.get("/index", (req, res) => {
  res.send(res.render("index"));
});
server.get("/signup", (req, res) => {
  res.send(res.render("signup"));
});
server.get("/login", (req, res) => {
  res.send(res.render("login"));
});
server.get("/", (req, res) => {
  res.send(res.render("portfolio"));
});

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
