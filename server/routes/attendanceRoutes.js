const express = require("express");
const router = express.Router();
const {
  getAttendanceRecords,
  markAttendance,
  deleteAttendanceById,
} = require("../controllers/attendancecontroller");

router.get("/", getAttendanceRecords);
router.post("/", markAttendance);
router.delete("/:id", deleteAttendanceById);

module.exports = router;