const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    age: {
        type: Number,
    },
    healthProblems: {
        type: String
    },
    cigarettesPerDay: {
        type: Number,
    },
  stopMails: {
  type: Boolean,
  default: false,
},
personalizedMail: {
  type: String,
  enum: ["Yes", "No", "Stopped"],
  default: "No",
},
  quitDate: {
    type: Date
  },
  formSubmitted: { 
    type: Boolean, 
    default: false 
},

  lastEmailSent: {
    type: Date,
    default: null
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);