const { Order } = require("../model/Order");
const {
  sendDeclineNotification,
} = require("../services/sendPaymentDeclinedNotification");

async function handlePaymentDeclined(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "declined" });
    sendDeclineNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment decline:", error);
  }
  console.log(
    `Payment declined for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentDeclined = handlePaymentDeclined;
