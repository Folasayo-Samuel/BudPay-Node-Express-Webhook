const { transporter } = require("../index");

function sendPaymentFailedNotification(email, orderId, amount) {
  const mailOptions = {
    from: "your-email@example.com",
    to: "support@example.com",
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
