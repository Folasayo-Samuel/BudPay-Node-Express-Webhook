const { transporter } = require("../index");
require("dotenv").config();

function sendPaymentPendingNotification(email, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Pending Notification",
    text: `Payment of ${amount} for order ${orderId} is pending for customer ${email}.`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send payment pending notification:", error);
    } else {
      console.log("Payment pending notification sent:", info.response);
    }
  });
}
