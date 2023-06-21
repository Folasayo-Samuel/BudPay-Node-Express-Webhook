const { handlePaymentSucceeded } = require("./handlePaymentSucceeded");
const {handlePaymentPending} = require("./handlePaymentPending");
const {handlePaymentDeclined} = require("./handlePaymentDeclined");
const { handlePaymentFailed } = require("./handlePaymentFailed");

module.exports.createWebhook = (req, res) => {
  const { event, data } = req.body;
  
  if (event === "payment.succeeded") {
    handlePaymentSucceeded(data);
  }else if(event === "payment.pending"){
    handlePaymentPending(data);
  }
  else if(event === "payment.declined"){
    handlePaymentDeclined(data);
  }
  else if (event === "payment.failed") {
    handlePaymentFailed(data);
  } else {
    console.log(`Received unknown event: ${event}`);
  }
  
  res.status(200).send("Webhook received successfully.");
};
