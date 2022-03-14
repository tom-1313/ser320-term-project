const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  lesson: Number,
  project: Number,
  homework: Number,
  study: Number,
  student: { type: Schema.Types.ObjectId, ref: "User" },
});

const CourseSchema = new Schema({
  name: String,
  totalLesson: Number,
  faculty: { type: Schema.Types.ObjectId, ref: "User" },
  entry: [EntrySchema],
});

module.exports = mongoose.model("Course", CourseSchema);
