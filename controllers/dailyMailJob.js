const cron = require("node-cron");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const ejs = require("ejs");
const path = require("path");
const autoMailData = require("../utils/autoMailData.json");

const templatePath = path.join(__dirname, "../views/mailBody/PersonalizedMail.ejs");

function getMotivationalMessage(day) {
  return (
    autoMailData[day] ||
    "Keep going — every smoke-free day adds strength, health, and pride!"
  );
}

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily motivational email job...");

  try {
    const today = new Date();
    const users = await User.find({
      formSubmitted: true,
      personalizedMail: "Yes",
      quitDate: { $lte: today },
    });

    for (const user of users) {
      const quitDate = new Date(user.quitDate);
      const diffInDays =
        Math.floor((today - quitDate) / (1000 * 60 * 60 * 24)) + 1;

      if (diffInDays > 60) {
        user.personalizedMail = "Stopped";
        await user.save();
        console.log(`${user.email} — completed 60-day program, stopped mails.`);
        continue;
      }
      if (user.stopMails === true) {
        console.log(`${user.email} — user manually stopped mails.`);
        continue;
      }

      const message = getMotivationalMessage(diffInDays);

      const html = await ejs.renderFile(templatePath, {
        name: user.username,
        message,
      });

      await sendMail(user.email, `Day ${diffInDays} Motivation`, html);
      console.log(`Sent Day ${diffInDays} mail to ${user.email}`);
    }

    console.log("Daily emails sent successfully!");
  } catch (err) {
    console.error("Error sending daily mails:", err);
  }
});
