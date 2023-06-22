const { handlePaymentRefund } = require("./handlePaymentRefund");
const { handlePaymentDispute } = require("./handlePaymentDispute");
const { handlePaymentTransaction } = require("./handlePaymentTransaction");
const {
  handlePaymentTransactionRecurrent,
} = require("./handlePaymentTransactionRecurrent");
const {handlePaymentTransactionWallet} = require("./handlePaymentTransactionWallet");
const {handlePaymentRecurringDebit} = require("./handlePaymentRecurringDebit");

module.exports.createWebhook = (req, res) => {
  const { event, data } = req.body;

  if (event.eventType === "refund") {
    handlePaymentRefund(data);
  } else if (event.eventType === "dispute") {
    handlePaymentDispute(data);
  } else if (event.eventType === "transaction") {
    handlePaymentTransaction(data);
  } else if (event.eventType === "transaction.recurrent") {
    handlePaymentTransactionRecurrent(data);
  } else if (event.eventType === "transaction.wallet") {
    handlePaymentTransactionWallet(data);
  } else if (event.eventType === "transaction.recurring.debit") {
    handlePaymentRecurringDebit(data);
  } else {
    console.log(`Received unknown event: ${event}`);
  }
  console.log(event);

  res.status(200).send("Webhook received successfully.");
};
