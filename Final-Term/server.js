const express = require("express");
const mongoose = require("mongoose");
let server = express();
var expressLayouts = require("express-ejs-layouts");
server.use(express.static("public"));
server.set("view engine", "ejs");
const flash = require("connect-flash");

let Product = require("./models/product.model");
let User = require("./models/user.model");
let cookieParser = require("cookie-parser");
server.use(cookieParser());

server.use(expressLayouts);
server.use(express.json());
server.use(express.urlencoded());
server.use(flash());

let session = require("express-session");
server.use(session({ secret: "my session secret", saveUninitialized: true }));

let siteMiddleware = require("./middleware/site.middleware");
let authMiddleware = require("./middleware/auth.middleware");
let adminMiddleware = require("./middleware/admin.middleware");
server.use(siteMiddleware);
const cartController = require("./routes/cart.controller");

server.post("/submit-order", authMiddleware, cartController.submitOrder);
server.get("/admin/orders", adminMiddleware, cartController.getAdminOrders);
server.post(
  "/admin/update-order-status",
  adminMiddleware,
  cartController.updateOrderStatus
);
server.get("/my-orders", authMiddleware, cartController.getUserOrders);

server.get("/logout", async (req, res) => {
  req.session.user = null;
  return res.redirect("/auth/login");
});

server.get("/auth/login", async (req, res) => {
  return res.render("auth/login");
});

server.get("/", async (req, res) => {
  return res.render("auth/login");
});

server.post("/auth/login", async (req, res) => {
  try {
    let data = req.body;
    let user = await User.findOne({ email: data.email });

    if (!user) return res.redirect("/auth/login");
    const isValid = await user.comparePassword(data.password);

    if (!isValid) return res.redirect("/auth/login");

    req.session.user = user;
    req.flash("success_msg", "You have successfully logged in.");
    return res.redirect("/portfolio");
  } catch (err) {
    req.flash("success_msg", "You have successfully logged in.");
  }
});

server.get("/auth/signup", async (req, res) => {
  return res.render("auth/signup");
});

server.post("/auth/signup", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email });

  if (user) return res.redirect("/auth/signup");

  user = new User(data);
  await user.save();

  return res.redirect("/auth/login");
});

let adminProductsRouter = require("./routes/products.controller");
server.use(adminProductsRouter);
let adminCreateRouter = require("./routes/create.controller");
server.use(adminCreateRouter);
let adminCategoryRouter = require("./routes/category.controller");
server.use(adminCategoryRouter);

server.get("/index", (req, res) => {
  res.send(res.render("index"));
});

server.get("/portfolio", (req, res) => {
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
