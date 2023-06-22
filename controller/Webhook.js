const { handlePaymentSucceeded } = require("./handlePaymentSucceeded");
const { handlePaymentPending } = require("./handlePaymentPending");
const { handlePaymentDeclined } = require("./handlePaymentDeclined");
const { handlePaymentFailed } = require("./handlePaymentFailed");

module.exports.createWebhook = (req, res) => {
  const { event, data } = req.body;

  if (event === "paid") {
    handlePaymentSucceeded(data);
  } else if (event === "pending") {
    handlePaymentPending(data);
  } else if (event === "declined") {
    handlePaymentDeclined(data);
  } else if (event === "failed") {
    handlePaymentFailed(data);
  } else {
    console.log(`Received unknown event: ${event}`);
  }
  console.log(event);

  res.status(200).send("Webhook received successfully.");
};

