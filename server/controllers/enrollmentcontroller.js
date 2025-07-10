const enrollmentService = require("../services/enrollmentService");
const logger = require("../utils/logger");

exports.getEnrollments = async (req, res) => {
  try {
    const result = await enrollmentService.getEnrollments();
    logger.info("Fetched all enrollments");
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error getting enrollments: " + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createEnrollment = async (req, res) => {
  try {
    const result = await enrollmentService.createEnrollment(req.body);
    logger.info("Enrollment created");
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error creating enrollment: " + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteEnrollmentById = async (req, res) => {
  try {
    const result = await enrollmentService.deleteEnrollmentById(req.params.id);
    logger.info("Enrollment deleted");
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error deleting enrollment: " + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
