const { transporter } = require("../index");
require("dotenv").config();

function sendConfirmationEmail(email, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: email,
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
