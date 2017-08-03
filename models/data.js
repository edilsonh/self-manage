const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    city: String,
    country: String,
  avatar: String,
  company: String,
  email: String,
  job: String,
  name: String,
  phone: String,
  skills: [String],
  university: String,
  username: String
});

module.exports = mongoose.model("User", userSchema, "profiles");
