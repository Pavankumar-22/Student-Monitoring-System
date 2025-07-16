const studentService = require("../services/studentService");
const logger = require("../utils/logger");

exports.getAllStudents = async (req, res) => {
  try {
    const result = await studentService.getAllStudents();
    logger.info("Fetched all students");
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error fetching students: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const result = await studentService.createStudent(req.body);
    logger.info(`Created student with id: ${result.data._id}`);
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error creating student: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStudentById = async (req, res) => {
  try {
  //  console.log("Fetching student by ID:", req.params.id);
    const result = await studentService.getStudentById(req.params.id);
    logger.info(`Fetched student with id: ${result.data._id}`);
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error getting student: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteStudentById = async (req, res) => {
  try {
    const result = await studentService.deleteStudentById(req.params.id);
    logger.info(`Deleted student with id: ${result.data._id}`);
    res.status(result.status).json(result.data);
  } catch (err) {
    logger.error("Error deleting student: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
};