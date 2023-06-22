const { transporter } = require("../index");
require("dotenv").config();

function sendTransactionNotification(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Pending Notification",
    text: `Payment of ${amount} for order ${orderId} is success for customer ${customerEmail}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send payment transaction notification:", error);
    } else {
      console.log("Payment transaction notification sent:", info.response);
    }
  });
}

exports.sendTransactionNotification = sendTransactionNotification;
