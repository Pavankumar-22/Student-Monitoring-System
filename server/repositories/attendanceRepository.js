const Attendance = require("../models/Attendance");

exports.getAllWithStudent = () => {
  return Attendance.find().populate("studentId");
};

exports.create = (data) => {
  return Attendance.create(data);
};

exports.deleteById = (id) => {
  return Attendance.findByIdAndDelete(id);
};
