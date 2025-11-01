const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

async function sendMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"SmokeFreeJourney" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log(`Mail sent to ${to}`);
  } catch (err) {
    console.error(`Failed to send email to ${to}: ${err.message}`);
  }
}

module.exports = sendMail;
