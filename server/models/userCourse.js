const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserCourseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  course: { type: Schema.Types.ObjectId, ref: "courses" },
});

module.exports = mongoose.model("UserCourse", UserCourseSchema);
