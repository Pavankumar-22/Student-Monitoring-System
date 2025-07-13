const express = require("express");
const AttendanceController = require("../controllers/attendancecontroller");

class AttendanceRoutes {
  router = express.Router();

  setRoutes() {
    this.router.get("/", AttendanceController.getAllAttendance);           // GET /api/attendance
    this.router.post("/mark", AttendanceController.markAttendance);       // POST /api/attendance/mark
    // this.router.delete("/delete/:id", AttendanceController.deleteAttendanceById); // DELETE /api/attendance/delete/:id
    return this.router;
  }
}

module.exports = new AttendanceRoutes().setRoutes();
