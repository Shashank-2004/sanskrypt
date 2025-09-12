const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup email transporter (use your Gmail + App Password)
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "misrakrish76@gmail.com", // 🔹 replace with your Gmail
    pass: "utzb gigl gkii xohp"    // 🔹 use App Password, not your normal password
  }
});

app.post("/submit", (req, res) => {
  const { name, mobile, age, email } = req.body;

  if (!name || !mobile || !age || !email) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const mailOptions = {
    from: '"Consultation Form" <misrakrish76@gmail.com>',  // ✅ fixed
    to: "misrakrish76@gmail.com",   // 🔹 where you want to receive
    replyTo: email,                 // 🔹 user’s email (so reply goes to them)
    subject: "New Consultation Request",
    html: `
      <h2>New Consultation Request</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <tr><th align="left">Name</th><td>${name}</td></tr>
        <tr><th align="left">Mobile</th><td>${mobile}</td></tr>
        <tr><th align="left">Age</th><td>${age}</td></tr>
        <tr><th align="left">Email</th><td>${email}</td></tr>
      </table>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.json({ success: false, message: "Failed to send email" });
    }
    res.json({ success: true, message: "Email sent successfully!" });
  });
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
