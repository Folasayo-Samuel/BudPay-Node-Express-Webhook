const { Order } = require("../model/Order");
const {
  sendRefundNotification,
} = require("../services/sendRefundNotification");

async function handlePaymentRefund(data) {
  const { orderId, amount, customerEmail } = data;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "declined" });
    sendRefundNotification(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment decline:", error);
  }
  console.log(
    `Payment declined for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentRefund = handlePaymentRefund;
