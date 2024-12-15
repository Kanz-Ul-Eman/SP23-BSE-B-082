const express = require("express");
const mongoose = require("mongoose");
let server = express();
var expressLayouts = require("express-ejs-layouts");
server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.urlencoded());

let adminProductsRouter = require("./routes/products.controller");
server.use(adminProductsRouter);
let adminCreateRouter = require("./routes/create.controller");
server.use(adminCreateRouter);
let adminCategoryRouter = require("./routes/category.controller");
server.use(adminCategoryRouter);

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

let connectionString =
  "mongodb+srv://kanz:kanz123@sp23-bse-082.varls.mongodb.net/";
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));

server.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
