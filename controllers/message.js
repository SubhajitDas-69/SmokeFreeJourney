const nodemailer = require("nodemailer");
const User = require("../models/user");
const genMessage = require("../utils/massageGenerate");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

module.exports.message = async (req, res, next) => {
  try {
    if (!req.user) {
      req.flash("error", "You must be logged in to submit the form.");
      return res.redirect("/home");
    }
    if (!req.body || !req.body.response) {
      console.log("Missing req.body.response:", req.body);
      req.flash("error", "Form data missing. Please fill out the form again.");
      return res.redirect("/home");
    }
    const id = req.user._id;
    const { response } = req.body;

    const userUpdate = {
      ...response,
      formSubmitted: true,
      quitDate: response.personalizedMail === "Yes" ? new Date() : null,
      stopMails: response.personalizedMail === "Yes" ? false : true,
    };
    const userResponse = await User.findByIdAndUpdate(id, userUpdate, { new: true });

    if (!userResponse) {
      req.flash("error", "User not found.");
      return res.redirect("/home");
    }

    const intake = userResponse.cigarettesPerDay;
    const message = genMessage(intake, userResponse.healthProblems);
    const templatePath = path.join(__dirname, "../views/mailBody/mails.ejs");
    const htmlTemplate = await ejs.renderFile(templatePath, {
      name: userResponse.username,
      message,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });
    const mailOptions = {
      from: `"SmokeFree Journey" <${process.env.EMAIL}>`,
      to: userResponse.email,
      subject:
        userResponse.personalizedMail === "Yes"
          ? "Personalized Daily Motivation Setup"
          : "Your Quit Smoking Guide",
      html: htmlTemplate,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email failed:", error);
        req.flash("error", "Email sending failed. Please try again later.");
        return res.redirect("/home");
      }

      console.log("Email sent:", info.response);
      req.flash(
        "success",
        userResponse.personalizedMail === "Yes"
          ? "Personalized mail setup complete! You’ll receive daily reminders starting today."
          : "One-time email sent successfully."
      );
      res.redirect("/home");
    });
  } catch (err) {
    console.error("Message Controller Error:", err);
    next(err);
  }
};

module.exports.stopMessage = async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "Please log in first.");
      return res.redirect("/home");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/home");
    }

    if (user.personalizedMail !== "Stopped") {
      user.stopMails = true;
      user.personalizedMail = "Stopped";
      await user.save();

      req.flash("success", "You have successfully stopped daily reminder emails.");
    } else {
      req.flash("info", "You have already stopped daily reminder emails.");
    }

    res.redirect("/home");
  } catch (e) {
    console.error("Error stopping mails:", e);
    req.flash("error", "Failed to stop emails. Please try again.");
    res.redirect("/home");
  }
};
