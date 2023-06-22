const {
  sendPaymentDisputeNotification,
} = require("../services/sendPaymentDisputeNotification");
const { Order } = require("../model/Order");

async function handlePaymentDispute(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "failed" });

    sendPaymentDisputeNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment failed:", error);
  }

  console.log(
    `Payment failed for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}
exports.handlePaymentDispute = handlePaymentDispute;
