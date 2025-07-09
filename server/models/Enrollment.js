const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  enrolledDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "completed", "dropped", "suspended"], default: "active" },
  grade: { type: String }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
