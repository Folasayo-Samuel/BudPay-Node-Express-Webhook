const { Order } = require("../model/Order");
const {
  sendTransactionWalletNotification,
} = require("../services/sendTransactionWalletNotification");

async function handlePaymentTransactionWallet(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "pending" });
    sendTransactionWalletNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment transaction:", error);
  }
  console.log(
    `Payment is transaction for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentTransactionWallet = handlePaymentTransactionWallet;
