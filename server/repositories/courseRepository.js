const Course = require("../models/course");
const logger = require("../utils/logger");

class CourseRepository {
  async findAll() {
    try {
      const courses = await Course.find();
      logger.info("Fetched all courses");
      return courses;
    } catch (err) {
      logger.error("Error fetching courses: " + err.message);
      throw err;
    }
  }

  async findByCode(code) {
    try {
      const course = await Course.findOne({ code });
      logger.info(`Fetched course with code: ${code}`);
      return course;
    } catch (err) {
      logger.error("Error fetching course by code: " + err.message);
      throw err;
    }
  }

  async create(data) {
    try {
      const newCourse = await Course.create(data);
      logger.info(`Created course with code: ${newCourse.code}`);
      return newCourse;
    } catch (err) {
      logger.error("Error creating course: " + err.message);
      throw err;
    }
  }

  async deleteByCode(code) {
    try {
      const deleted = await Course.findOneAndDelete({ code });
      if (deleted) {
        logger.info(`Deleted course with code: ${code}`);
      } else {
        logger.warn(`No course found to delete with code: ${code}`);
      }
      return deleted;
    } catch (err) {
      logger.error("Error deleting course: " + err.message);
      throw err;
    }
  }
}

module.exports = new CourseRepository();
