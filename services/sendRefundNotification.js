const { transporter } = require("../index");
require("dotenv").config();

function sendRefundNotification(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Refund Notification",
    text: `Payment of ${amount} for order ${orderId} has been Refund to customer ${customerEmail}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send payment refund notification:", error);
    } else {
      console.log("Payment refund notification sent:", info.response);
    }
  });
}

exports.sendTransactionNotification = sendRefundNotification;
