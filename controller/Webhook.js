const { handlePaymentFailed } = require("./handlePaymentFailed");
const { handlePaymentSucceeded } = require("./handlePaymentSucceeded");

module.exports.createWebhook = (req, res) => {
  const { event, data } = req.body;

  if (event === "payment.succeeded") {
    handlePaymentSucceeded(data);
  } else if (event === "payment.failed") {
    handlePaymentFailed(data);
  } else {
    console.log(`Received unknown event: ${event}`);
  }

  res.status(200).send("Webhook received successfully.");
};
