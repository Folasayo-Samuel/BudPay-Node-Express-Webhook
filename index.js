const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { createWebhook } = require("./controller/Webhook");
const { Order } = require("./model/Order");

const app = express();
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.send("Welcome to BudPay Webhooks Tutorial!");
});
app.post("/api/v1/webhook", createWebhook);
app.post("/api/v1/order", async (req, res) => {
  try {
    let data = req.body;
    const index = await Order.find().count();
    const orderDetails = new Order({
      orderId: index + 1,
      status: data.status,
      customerEmail: data.customerEmail,
      amount: data.amount,
    });

    await orderDetails.save();

    res.status(201).send({ message: "Order created successfully!" });
  } catch (error) {
    console.error(error);
  }
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
exports.transporter = transporter;

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/budpay_webhook";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
