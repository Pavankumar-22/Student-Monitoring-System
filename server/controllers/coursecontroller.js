const courseService = require('../services/courseService');
const logger = require('../utils/logger'); // optional if you use logger

exports.getCourses = async (req, res) => {
  try {
    const result = await courseService.getAllCourses();
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error getting courses: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const result = await courseService.createCourse(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error creating course: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteCourseByCode = async (req, res) => {
  try {
    const result = await courseService.deleteCourseByCode(req.params.code);
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error deleting course: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};
