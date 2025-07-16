const express = require("express");
const AttendanceController = require("../controllers/attendancecontroller");

function AttendanceRoutes() {
  const router = express.Router();

  // console.log("AttendanceRoutes initialized");

  router.get("/get", AttendanceController.getAllAttendance);           // GET /api/attendance
  router.post("/mark", AttendanceController.markAttendance);        // POST /api/attendance/mark

  return router;
}

module.exports = AttendanceRoutes;
