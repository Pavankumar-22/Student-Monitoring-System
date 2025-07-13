const attendanceService = require("../services/attendanceService");
const logger = require("../utils/logger");

exports.getAllAttendance = async (req, res) => {
  const { date } = req.query; // ✅ Capture ?date=YYYY-MM-DD from URL
  const result = await attendanceService.getAllAttendance(date);

  if (date) {
    logger.info(`Fetched attendance records for date: ${date}`);
  } else {
    logger.info("Fetched all attendance records");
  }

  res.status(result.status).json(result.data);
};

exports.markAttendance = async (req, res) => {
  const result = await attendanceService.markAttendance(req.body);
  res.status(result.status).json(result.data);
};

exports.deleteAttendanceById = async (req, res) => {
  const { id } = req.params;
  const result = await attendanceService.deleteAttendance(id);
  res.status(result.status).json(result.data);
};
