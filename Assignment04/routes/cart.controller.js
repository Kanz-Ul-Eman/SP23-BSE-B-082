const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model"); // Ensure User model is imported

exports.submitOrder = async (req, res) => {
  try {
    const { products, customerName, phone, address, total } = req.body;

    // Validate input
    if (
      !customerName ||
      !phone ||
      !address ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, and the cart must not be empty.",
      });
    }

    // Verify product prices
    const productIds = products.map((p) => p.id);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    // Create order with verified products
    const order = new Order({
      user: req.session.user ? req.session.user._id : null,
      products: products.map((product) => {
        const dbProduct = dbProducts.find(
          (p) => p._id.toString() === product.id
        );
        return {
          product: product.id,
          quantity: product.quantity,
          price: dbProduct ? dbProduct.price : product.price,
        };
      }),
      totalPrice: parseFloat(total),
      customerName,
      phone,
      address,
      status: "Pending", // Ensure default status
    });

    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully!",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Order submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order. Please try again later.",
    });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "user",
        select: "email", // Only select email field
        // This handles cases where user might be null
        options: {
          strictPopulate: false,
        },
      })
      .populate({
        path: "products.product",
        select: "title price", // Only select title and price
        options: {
          strictPopulate: false,
        },
      })
      .sort({ createdAt: -1 });

    // Ensure each order has default values
    const processedOrders = orders.map((order) => {
      // Create a new object to avoid modifying the original
      const processedOrder = order.toObject();

      // Default values for missing fields
      processedOrder.user = processedOrder.user || { email: "Guest User" };
      processedOrder.status = processedOrder.status || "Pending";
      processedOrder.totalPrice = processedOrder.totalPrice || 0;
      processedOrder.products = processedOrder.products || [];

      return processedOrder;
    });

    res.render("admin/orders", {
      pageTitle: "Manage Orders",
      orders: processedOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).render("error", {
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
