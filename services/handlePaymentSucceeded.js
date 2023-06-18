const {Order} = require("../model/Order");
const { sendConfirmationEmail } = require("./sendConfirmationEmail");


async function handlePaymentSucceeded(data) {
    const { orderId, amount, customerEmail } = data;

    try {
        await Order.findOneAndUpdate({ orderId }, { status: "paid" });

        sendConfirmationEmail(customerEmail, orderId, amount);
    } catch (error) {
        console.error("Failed to handle payment succeeded:", error);
    }

    console.log(
        `Payment succeeded for order ${orderId}. Amount: ${amount}. Customer email: ${customerEmail}`
    );
}
exports.handlePaymentSucceeded = handlePaymentSucceeded;
