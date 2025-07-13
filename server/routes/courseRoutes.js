const express = require("express");
const { getCourses,createCourse,deleteCourseByCode } = require("../controllers/coursecontroller");

class CourseRoutes {
  router = express.Router();

  setRoutes() {
    this.router.get("/get", getCourses);
    this.router.post("/create", createCourse);
    this.router.delete("/delete/:code", deleteCourseByCode);
    return this.router;
  }
}

module.exports = new CourseRoutes().setRoutes();
