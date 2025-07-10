const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendancecontroller");

router.get("/", attendanceController.getAllAttendance);
router.post("/mark", attendanceController.markAttendance);
router.delete("/delete/:id", attendanceController.deleteAttendanceById);

module.exports = router;
