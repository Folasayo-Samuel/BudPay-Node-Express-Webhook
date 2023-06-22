const { transporter } = require("../index");
require("dotenv").config();

function sendTransactionRecurrentNotification(customerEmail, orderId, amount) {
  const mailOptions = {
    from: process.env.SELLER_MAIL_ADDRESS,
    to: process.env.BUDPAY_CUSTOMER_SUPPORT_MAIL,
    subject: "Payment Transaction Recurrent Notification",
    text: `Payment of ${amount} for order ${orderId} has been recurrent for customer ${customerEmail}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(
        "Failed to send payment transaction recurrent notification:",
        error
      );
    } else {
      console.log(
        "Payment transaction recurrent notification sent:",
        info.response
      );
    }
  });
}

exports.sendTransactionRecurrentNotification =
  sendTransactionRecurrentNotification;
