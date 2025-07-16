const Student = require("../models/Studentmodel");
const logger = require("../utils/logger");

class StudentRepository {
  async findAll() {
    try {
      const students = await Student.find();
      logger.info("Fetched all students");
      return students;
    } catch (err) {
      logger.error("Error fetching students: " + err.message);
      throw err;
    }
  }

  async create(studentData) {
    try {
      const newStudent = await Student.create(studentData);
      logger.info(`Created student with ID: ${newStudent.id}`);
      return newStudent;
    } catch (err) {
      logger.error("Error creating student: " + err.message);
      throw err;
    }
  }

  async findById(id) {
    try {
      // console.log("Finding student by ID:", typeof id);
      // console.log("ID as string:", id);
      const student = await Student.findOne({ id });
      // console.log("data:::", student);
      logger.info(`Fetched student with ID: ${id}`);
      return student;
    } catch (err) {
      logger.error("Error fetching student by ID: " + err.message);
      throw err;
    }
  }

  async deleteById(id) {
    try {
      const deleted = await Student.findOneAndDelete({ id });
      if (deleted) {
        logger.info(`Deleted student with ID: ${id}`);
      } else {
        logger.warn(`No student found to delete with ID: ${id}`);
      }
      return deleted;
    } catch (err) {
      logger.error("Error deleting student: " + err.message);
      throw err;
    }
  }
}

module.exports = new StudentRepository();
