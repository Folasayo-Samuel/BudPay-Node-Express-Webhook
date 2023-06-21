const { Order } = require("../model/Order");
const {
  sendPendingNotification,
} = require("../services/sendPaymentPendingNotification");

async function handlePaymentPending(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "pending" });
    sendPendingNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment pending:", error);
  }
  console.log(
    `Payment is pending for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentPending = handlePaymentPending;