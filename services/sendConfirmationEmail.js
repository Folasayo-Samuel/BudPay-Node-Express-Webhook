const { transporter } = require("../index");
require("dotenv").config();
const { Order } = require("../model/Order");

  const { orderId, amount, customerEmail } = Order;


function sendConfirmationEmail(customerEmail, orderId, amount) {
  
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: customerEmail,
    subject: "Payment Confirmation",
    text: `Your payment of ${amount} has been received for order ${orderId}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send confirmation email:", error);
    } else {
      console.log("Confirmation email sent:", info.response);
    }
  });
}
exports.sendConfirmationEmail = sendConfirmationEmail;
