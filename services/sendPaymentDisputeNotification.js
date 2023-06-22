const { transporter } = require("../index");
require("dotenv").config();

function sendPaymentDisputeNotification(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Dispute Notification",
    text: `Payment of ${amount} for order ${orderId} has dispute for customer ${customerEmail}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send payment dispute notification:", error);
    } else {
      console.log("Payment dispute notification sent:", info.response);
    }
  });
}
exports.sendPaymentDisputeNotification = sendPaymentDisputeNotification;
