const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: Number,
  status: {
    type: String,
    default: "pending",
  },
  customerEmail: String,
  amount: Number,
});

const Order = mongoose.model("Order", orderSchema);
exports.Order = Order;
