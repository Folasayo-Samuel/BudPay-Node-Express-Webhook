const { Order } = require("../model/Order");
const {
  sendRecurringDebitEmail,
} = require("../services/sendRecurringDebitEmail");

async function handlePaymentRecurringDebit(data) {
  const { orderId, amount, customerEmail } = Order;

  try {
    await Order.findOneAndUpdate({ orderId }, { status: "recurring-debit" });

    sendRecurringDebitEmail(customerEmail, orderId, amount);
  } catch (error) {
    console.error("Failed to handle payment recurring debit:", error);
  }

  console.log(
    `Payment recurring debit for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
  );
}

exports.handlePaymentRecurringDebit = handlePaymentRecurringDebit;
