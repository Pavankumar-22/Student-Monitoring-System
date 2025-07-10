const attendanceRepo = require("../repositories/attendanceRepository");

exports.getAllAttendance = async () => {
  try {
    const records = await attendanceRepo.getAllWithStudent();
    return { status: 200, data: records };
  } catch (err) {
    return { status: 500, data: { error: "Failed to fetch attendance records" } };
  }
};

exports.markAttendance = async (payload) => {
  const { student, course, date, status } = payload;
  if (!student || !date || !status) {
    return { status: 400, data: { error: "Missing required fields" } };
  }
  try {
    const record = await attendanceRepo.create({ student, course, date, status });
    return { status: 201, data: record };
  } catch (err) {
    return { status: 400, data: { error: err.message } };
  }
};

exports.deleteAttendance = async (id) => {
  try {
    const deleted = await attendanceRepo.deleteById(id);
    if (!deleted) return { status: 404, data: { error: "Record not found" } };
    return { status: 200, data: { message: "Attendance deleted" } };
  } catch (err) {
    return { status: 500, data: { error: err.message } };
  }
};
