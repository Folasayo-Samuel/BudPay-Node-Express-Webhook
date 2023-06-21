const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { createWebhook } = require("./controller/Webhook");

const app = express();
app.use(express.json());

// Route
app.post("/webhook", createWebhook);

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
