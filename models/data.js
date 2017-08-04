const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  username: { type: String, unique: true, lowercase: true, required: true}
  passwordHash: { type: String, required: true}
});

const User = mongoose.model("User", userSchema);

userSchema.virtual('password')
  .get(function () { return null })
  .set(function (value) {
    const hash = bcrypt.hashSync(value, 8);
    this.passwordHash = hash;
  })

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

module.exports = mongoose.model("User", userSchema, "profiles");
