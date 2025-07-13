const Enrollment = require("../models/Enrollment");
const logger = require("../utils/logger");

class EnrollmentRepository {
  async getAll() {
    try {
      const enrollments = await Enrollment.find().populate("student course");
      logger.info("Fetched all enrollments");
      return enrollments;
    } catch (err) {
      logger.error("Error fetching enrollments: " + err.message);
      throw err;
    }
  }

  async findOne(filter) {
    try {
      const enrollment = await Enrollment.findOne(filter);
      logger.info(`Fetched enrollment with filter: ${JSON.stringify(filter)}`);
      return enrollment;
    } catch (err) {
      logger.error("Error finding enrollment: " + err.message);
      throw err;
    }
  }

  async create(data) {
    try {
      const newEnrollment = await Enrollment.create(data);
      logger.info(`Created enrollment with id: ${newEnrollment._id}`);
      return newEnrollment;
    } catch (err) {
      logger.error("Error creating enrollment: " + err.message);
      throw err;
    }
  }

  async deleteById(id) {
    try {
      const deleted = await Enrollment.findByIdAndDelete(id);
      if (deleted) {
        logger.info(`Deleted enrollment with id: ${id}`);
      } else {
        logger.warn(`Enrollment not found for deletion with id: ${id}`);
      }
      return deleted;
    } catch (err) {
      logger.error("Error deleting enrollment: " + err.message);
      throw err;
    }
  }
}

module.exports = new EnrollmentRepository();
