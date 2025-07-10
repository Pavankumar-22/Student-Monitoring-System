const express = require("express");
const router = express.Router();
const {
  getEnrollments,
  createEnrollment,
  deleteEnrollmentById,
} = require("../controllers/enrollmentcontroller");

router.get("/enrollments", getEnrollments);
router.post("/enrollments", createEnrollment);
router.delete("/enrollments/:id", deleteEnrollmentById);

module.exports = router;