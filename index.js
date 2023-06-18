const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
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
    user: "your-email@example.com",
    pass: process.env.GMAIL_PASSWORD,
  },
});
exports.transporter = transporter;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
