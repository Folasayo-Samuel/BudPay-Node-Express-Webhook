const { transporter } = require("../index");
require("dotenv").config();

function sendPaymentDeclineNotification(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Decline Notification",
    text: `Payment of ${amount} for order ${orderId} has been declined for customer ${customerEmail}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send payment decline notification:", error);
    } else {
      console.log("Payment decline notification sent:", info.response);
    }
  });
}
