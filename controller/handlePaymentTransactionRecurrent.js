const { Order } = require("../model/Order");
const {
  sendTransactionRecurrentNotification,
} = require("../services/sendTransactionNotification");

async function handlePaymentTransactionRecurrent(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "pending" });
    sendTransactionRecurrentNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment transaction:", error);
  }
  console.log(
    `Payment is transaction for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentTransactionRecurrent = handlePaymentTransactionRecurrent;
