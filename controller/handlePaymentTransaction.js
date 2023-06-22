const { Order } = require("../model/Order");
const {
  sendTransactionNotification,
} = require("../services/sendTransactionNotification");

async function handlePaymentTransaction(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "pending" });
    sendTransactionNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment transaction:", error);
  }
  console.log(
    `Payment is transaction for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentTransaction = handlePaymentTransaction;