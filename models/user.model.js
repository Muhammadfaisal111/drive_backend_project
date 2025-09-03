const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  email: { type: String, required: true, unique: true, minlength: 5 },
  password: { type: String, required: true, minlength: 6 },
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
