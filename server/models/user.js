const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isFaculty: Boolean,
});

module.exports = mongoose.model("User", UserScheme);
