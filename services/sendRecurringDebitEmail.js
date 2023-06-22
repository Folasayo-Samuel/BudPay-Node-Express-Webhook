const { transporter } = require("../index");
require("dotenv").config();
const { Order } = require("../model/Order");

const { orderId, amount, customerEmail } = Order;

function sendRecurringDebitEmail(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: customerEmail,
    subject: "Payment Transaction Recurring Debit",
    text: `Your payment transaction recurring debit of ${amount} has been received for order ${orderId}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(
        "Failed to send payment transaction recurring debit email:",
        error
      );
    } else {
      console.log(
        "Payment transaction recurring debit email sent:",
        info.response
      );
    }
  });
}
exports.sendRecurringDebitEmail = sendRecurringDebitEmail;
