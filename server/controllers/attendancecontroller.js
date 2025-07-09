const Attendance = require('../models/Attendance');

exports.getAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance.find().populate("studentId");
    res.json(records);
  } catch (err) {
    console.error("Attendance fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { student, course, date, status } = req.body;
    const record = await Attendance.create({ student, course, date, status });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAttendanceById = async (req, res) => {
  const { id } = req.params;
  const deleted = await Attendance.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Record not found' });
  res.json({ message: 'Attendance deleted' });
};