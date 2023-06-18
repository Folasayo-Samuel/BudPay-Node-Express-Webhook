const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  status: String,
});

const Order = mongoose.model("Order", orderSchema);
exports.Order = Order;
