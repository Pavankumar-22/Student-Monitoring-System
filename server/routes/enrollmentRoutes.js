const express = require("express");
const router = express.Router();
const {
  getEnrollments,
  createEnrollment,
  deleteEnrollmentById,
} = require("../controllers/enrollmentcontroller");

router.get("/", getEnrollments);
router.post("/", createEnrollment);
router.delete("/:id", deleteEnrollmentById);

module.exports = router;