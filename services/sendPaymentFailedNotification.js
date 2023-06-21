const { transporter } = require("../index");
require("dotenv").config();

function sendPaymentFailedNotification(email, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Failed Notification",
    text: `Payment of ${amount} for order ${orderId} has failed for customer ${email}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send payment failed notification:", error);
    } else {
      console.log("Payment failed notification sent:", info.response);
    }
  });
}
exports.sendPaymentFailedNotification = sendPaymentFailedNotification;
