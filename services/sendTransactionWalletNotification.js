const { transporter } = require("../index");
require("dotenv").config();

function sendTransactionWalletNotification(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Transaction Wallet Notification",
    text: `Payment of ${amount} for order ${orderId} has been sent to wallet for customer ${customerEmail}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(
        "Failed to send payment transaction wallet notification:",
        error
      );
    } else {
      console.log(
        "Payment transaction wallet notification sent:",
        info.response
      );
    }
  });
}

exports.sendTransactionWalletNotification = sendTransactionWalletNotification;
